
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Обязательное поле';
  }

  if ( ! values['address']) {
    errors['address'] = 'Обязательное поле';
  }

  return errors;
}


export default reduxForm({
  form: 'shop-modify',
  validate,
  enableReinitialize: true,
})(Component);
