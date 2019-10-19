
import { bindActionCreators } from 'redux';
import { getFormValues, isInvalid, isPristine, submit, reset } from 'redux-form';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import {
  resetData,
  getUnits,
  getProductById,
  updateProductsById,
  createProduct,
  pageInProcess
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
    product: Product['product'],
    isError: Product['isError'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    resetData: bindActionCreators(resetData, dispatch),
    reset: bindActionCreators(reset, dispatch),
    getUnits: bindActionCreators(getUnits, dispatch),
    getProductById: bindActionCreators(getProductById, dispatch),
    updateProductsById: bindActionCreators(updateProductsById, dispatch),
    createProduct: bindActionCreators(createProduct, dispatch),
    onSubmit: bindActionCreators(submit, dispatch),
    pageInProcess: bindActionCreators(pageInProcess, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ getProductById, getUnits, match: { params: { id }}, pageInProcess }) => {
    if (id) {
      await getProductById(id);
    }
    await getUnits();
    pageInProcess(false);
  },
  onDestroy: ({ resetData }) => {
    resetData();
  }
})(Component);