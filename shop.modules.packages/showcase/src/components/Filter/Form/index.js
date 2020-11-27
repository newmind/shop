
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if (values['amountFrom']) {
    if ( ! /^\d+(.\d{1,2})?$/.test(values['amountFrom'])) {
      errors['amountFrom'] = 'Неверный формат';
    }
  }
  if (values['amountTo']) {
    if ( ! /^\d+(.\d{1,2})?$/.test(values['amountTo'])) {
      errors['amountTo'] = 'Неверный формат';
    } else if (values['amountTo'] < values['amountFrom']) {
      errors['amountTo'] = 'Неверное значение';
    }
  }
  return errors;
};

export default reduxForm({
  form: 'showcase-filter',
  validate,
})(Component);
