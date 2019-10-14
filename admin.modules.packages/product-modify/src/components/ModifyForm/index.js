
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = () => {
  let errors = {};
  return errors;
};


export default reduxForm({
  form: 'modify-product',
  enableReinitialize: true,
  validate,
})(Component);