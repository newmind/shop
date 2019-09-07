
import { bindActionCreators } from 'redux';
import PageHOC from '@ui.packages/hocs';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import Component from './Component';

import { getProducts, removeProductById } from '../ducks/commands';


const mapStateToProps = state => {
  const Products = state['Recycle'];
  return {
    products: Products['products'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
    removeProductById: bindActionCreators(removeProductById, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ getProducts }) => {
    getProducts();
  },
})(Component);