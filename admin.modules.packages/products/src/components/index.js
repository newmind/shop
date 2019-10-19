
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import { pushNotification } from '@ui.packages/notifications';
import { openDialog, closeDialog } from '@ui.packages/dialog';

import {
  getProducts,
  createProducts,
  removeProductById,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Products = state['products'];
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
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ getProducts }) => {
    getProducts();
  },
})(Component);