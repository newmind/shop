
import { bindActionCreators } from 'redux';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import {
  getProductById,
  addProductToCart,
  createComment,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Product = state['Product'];
  return {
    product: Product['product'],
    initialValues: {
      evaluation: 0,
      person: '',
      comment: '',
    }
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    createComment: bindActionCreators(createComment, dispatch),
    getProductById: bindActionCreators(getProductById, dispatch),
    addProductToCart: bindActionCreators(addProductToCart, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ getProductById, match: { params } }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Продукт`;
    const { id } = params;
    getProductById(id);
  },
  onChange: () => { console.log('onChange')},
  onDestroy: () => {console.log('onDestroy')},
})(Component);
