
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  let errors = {};

  if ( ! values['brand']) {
    errors['brand'] = 'Неоходимо заполнить';
  }

  if ( ! values['type']) {
    errors['type'] = 'Неоходимо заполнить';
  }

  if ( ! values['description']) {
    errors['description'] = 'Неоходимо заполнить';
  }

  const attrsErrors = [];
  (values['attributes'] || []).forEach((item, index) => {
    const attrErrors = {};
    if ( ! item['name']) {
      attrErrors['name'] = 'Неоходимо заполнить';
      attrsErrors[index] = attrErrors;
    }
    if ( ! item['value']) {
      attrErrors['value'] = 'Неоходимо заполнить';
      attrsErrors[index] = attrErrors;
    }
  });

  if (attrsErrors.length) {
    errors['attributes'] = attrsErrors;
  }

  return errors;
};


export default reduxForm({
  form: 'modify-product',
  enableReinitialize: true,
  validate,
})(Component);