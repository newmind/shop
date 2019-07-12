
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import PageHOC from '../../_bin/PageHOC';

import Component from './Component';

import { pushNotification } from '@ui.packages/notifications';

import {
  openDialog,
  closeDialog,

  getProducts,
  createProducts,
  removeProductById,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Products = state['Products'];
  return {
    products: Products['products'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),
    replaceURI: bindActionCreators(replace, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
    createProducts: bindActionCreators(createProducts, dispatch),
    removeProductById: bindActionCreators(removeProductById, dispatch),
    pushNotification: bindActionCreators(pushNotification, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading, getProducts }) => {
    getProducts();
    onLoading(false);
  },
})(Component);