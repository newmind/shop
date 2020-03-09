
import PageHOC from '@ui.packages/hocs';
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';

import Component from './Component';


import {
  pageInProcess,

  addProductToCart,
  removeProductFromCart,

  getProductById,
  createComment,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Product = state['product'];
  return {
    product: Product['product'],
    cart: state['cart']['items'],
    initialValues: {
      evaluation: 0,
      person: '',
      comment: '',
    }
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageInProcess: bindActionCreators(pageInProcess, dispatch),

    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    addProductToCart: bindActionCreators(addProductToCart, dispatch),
    removeProductFromCart: bindActionCreators(removeProductFromCart, dispatch),

    getProductById: bindActionCreators(getProductById, dispatch),
    createComment: bindActionCreators(createComment, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getProductById, match: { params } }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Продукт`;
    const { id } = params;
    await getProductById(id);
    pageInProcess(false);
  },
})(Component);
