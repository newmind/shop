
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  const errors = {};

  if ( ! values['count']) {
    errors['count'] = 'Необходимо заполнить'
  } else if (values['count'] < 0) {
    errors['count'] = 'Только положительное значение';
  }

  if ( ! values['currency']) {
    errors['currency'] = 'Необходимо выбрать';
  }

  if ( ! values['product']) {
    errors['product'] = 'Необходимо выбрать';
  }

  return errors;
};

export default reduxForm({
  form: 'add-stock-product',
  validate,
})(Component);
