
import { bindActionCreators } from 'redux';

import { openDialog, closeDialog } from '@packages/dialog';

import PageHOC from '../../_bin/PageHOC';

import Component from './Component';

import {
  destroy,

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
  const stock = state['Stock'];
  return {
    inProcess: stock['inProcess'],
    stock: stock['stock'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    destroy: bindActionCreators(destroy, dispatch),

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
  onEnter: async ({ onLoading, getProducts, getStockProducts, getCurrencies, getCategories }) => {
    await getCategories();
    await getCurrencies();
    await getStockProducts();
    await getProducts();
    onLoading(false);
  },
})(Component);