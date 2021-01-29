
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  let errors = {};

  if ( ! values['brand']) {
    errors['brand'] = 'Неоходимо заполнить';
  }

  if ( ! values['name']) {
    errors['name'] = 'Неоходимо заполнить';
  }

  if ( ! values['description']) {
    errors['description'] = 'Неоходимо заполнить';
  }

  if ( ! values['amount']) {
    errors['amount'] = 'Неоходимо заполнить';
  }
  else if ( ! /^\d+(.\d{1,2})?$/.test(values['amount'])) {
    errors['amount'] = 'Неверный формат';
  }

  if ( ! values['currencyId']) {
    errors['currencyId'] = 'Неоходимо заполнить';
  }

  const attrsErrors = [];
  (values['attributes'] || []).forEach((item, index) => {
    const attrErrors = {};

    if ( ! item['id']) {
      attrErrors['id'] = 'Неоходимо выбрать';
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
