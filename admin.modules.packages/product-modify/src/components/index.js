
import { bindActionCreators } from 'redux';
import { getFormValues, isInvalid, isPristine, submit, reset } from 'redux-form';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import {
  pageInProcess,

  resetData,
  getTypes,
  getUnits,
  getColors,
  getCurrencies,
  getCategories,
  getMaterials,
  getForms,
  getProductById,
  updateProductsById,
  createProduct,
  deleteImages,
} from '../ducks/commands';


const mapStateToProps = state => {

  const Product = state['product-modify'];

  const formValues = getFormValues('modify-product')(state);
  const isFormInvalid = isInvalid('modify-product')(state);
  const isFormPristine = isPristine('modify-product')(state);

  return {
    hasId: formValues ? !! formValues['id'] : false,
    isInvalid: isFormInvalid,
    isPristine: isFormPristine,
    units: Product['units'],
    colors: Product['colors'],
    forms: Product['forms'],
    types: Product['types'],
    materials: Product['materials'],
    currencies: Product['currencies'],
    categories: Product['categories'],
    product: Product['product'],
    isError: Product['isError'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,
  reset, submit,
  resetData,
  getTypes, getUnits, getCurrencies, getCategories, getMaterials, getColors, getForms, deleteImages,
  getProductById, updateProductsById, createProduct,
}, dispatch);

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ getProductById, getUnits, getTypes, getCurrencies, getCategories, getMaterials, getColors, getForms, match: { params: { id }}, pageInProcess }) => {

    if (id) {
      await getProductById(id);
    }

    await getTypes();
    await getUnits();
    await getForms();
    await getColors();
    await getMaterials();
    await getCurrencies();
    await getCategories();

    pageInProcess(false);
  },
  onDestroy: ({ resetData }) => {
    resetData();
  }
})(Component);