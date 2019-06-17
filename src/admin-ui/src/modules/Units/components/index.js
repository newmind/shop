
import { bindActionCreators } from 'redux';
import PageHOC from '../../_bin/PageHOC';

import { openDialog, closeDialog } from '@packages/dialog';

import Component from './Component';

import { getProducts, removeProductById } from '../ducks/commands';


const mapStateToProps = state => {
  const Products = state['Recycle'];
  return {
    // products: Products['products'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    // openDialog: bindActionCreators(openDialog, dispatch),
    // closeDialog: bindActionCreators(closeDialog, dispatch),
    // getProducts: bindActionCreators(getProducts, dispatch),
    // removeProductById: bindActionCreators(removeProductById, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading, getProducts }) => {
    // getProducts();
    onLoading(false);
  },
  onDestroy: () => {},
})(Component);