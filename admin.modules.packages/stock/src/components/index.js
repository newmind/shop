
import { bindActionCreators } from 'redux';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import {
  getCategories,
  getCurrencies,
  getProducts,

  getStockProducts,
  getStockProductsById,
  createProduct,
  updateStockProductById,
  removeProductById,
} from '../ducks/commands';


const mapStateToProps = state => {
  const stock = state['stock'];
  return {
    inProcess: stock['inProcess'],
    stock: stock['stock'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    getCurrencies: bindActionCreators(getCurrencies, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),

    getStockProducts: bindActionCreators(getStockProducts, dispatch),
    getStockProductsById: bindActionCreators(getStockProductsById, dispatch),
    createProduct: bindActionCreators(createProduct, dispatch),
    updateStockProductById: bindActionCreators(updateStockProductById, dispatch),
    removeProductById: bindActionCreators(removeProductById, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ getProducts, getStockProducts, getCurrencies, getCategories }) => {
    await getCategories();
    await getCurrencies();
    await getStockProducts();
    await getProducts();
  },
  onBeforeDestroy: () => {
    return true;
  }
})(Component);