
import { bindActionCreators } from 'redux';
import PageHOC from '../../_bin/PageHOC';

import Component from './Component';

import { openDialog, closeDialog } from '@packages/dialog';

import {
  getProductById,
  addProductToCart,
  createComment,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Product = state['Product'];
  return {
    product: Product['product'],
    isInitialize: Product['isInitialize'],
    initialValues: {
      evaluation: 0
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
  onEnter: ({ onLoading, isInitialize, getProductById, match: { params } }) => {
    const { id } = params;
    if ( ! isInitialize) {
      getProductById(id);
      onLoading(false);
    }
  },
  onChange: () => { console.log('onChange')},
  onDestroy: () => {console.log('onDestroy')},
})(Component);