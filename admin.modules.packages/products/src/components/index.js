
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';

import Component from './Component';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import {
  pageInProcess,

  getProducts,
  createProducts,
  removeProductById,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Products = state['products'];
  return {
    items: Products['items'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageInProcess: bindActionCreators(pageInProcess, dispatch),

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
  onEnter: async ({ pageInProcess, getProducts }) => {
    pageInProcess(false);
    await getProducts();
    pageInProcess(false);
  },
})(Component);