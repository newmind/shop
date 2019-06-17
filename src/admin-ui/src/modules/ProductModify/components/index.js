
import { bindActionCreators } from 'redux';
import { getFormValues, isInvalid, isPristine, submit } from 'redux-form';

import PageHOC from '../../_bin/PageHOC';

import Component from './Component';

import {
  getProductById,
  updateProductsById,
  createProduct
} from '../ducks/commands';


const mapStateToProps = state => {

  const Product = state['ProductModify'];

  const formValues = getFormValues('modify-product')(state);
  const isFormInvalid = isInvalid('modify-product')(state);
  const isFormPristine = isPristine('modify-product')(state);

  return {
    hasId: formValues ? !! formValues['id'] : false,
    isInvalid: isFormInvalid,
    isPristine: isFormPristine,
    product: Product['product'],
    isError: Product['isError'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getProductById: bindActionCreators(getProductById, dispatch),
    updateProductsById: bindActionCreators(updateProductsById, dispatch),
    createProduct: bindActionCreators(createProduct, dispatch),
    onSubmit: bindActionCreators(submit, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading, getProductById, match: { params: { id }} }) => {
    getProductById(id);
    onLoading(false);
  },
  onDestroy: () => {},
})(Component);