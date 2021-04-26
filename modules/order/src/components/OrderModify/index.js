
import { validation } from '@ui.packages/utils';

import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо ввести имя';
  }

  if ( ! values['surname']) {
    errors['surname'] = 'Необходимо ввести фамилию';
  }

  if ( ! values['phone']) {
    errors['phone'] = 'Необходимо ввести номер телефона';
  }
  else if ( ! /^\+7\d{10}$/.test(values['phone'])) {
    errors['phone'] = 'Неверный формат телефона';
  }

  if ( ! values['email']) {
    errors['email'] = 'Необходимо ввести ваш E-Mail';
  }
  else if ( ! validation.email(values['email'])) {
    errors['email'] = 'Неверный формат E-Mail';
  }

  if ( ! values['address']) {
    errors['address'] = 'Необходимо заполнить';
  }

  return errors;
};


export default reduxForm({
  form: 'order',
  validate,
  enableReinitialize: true,
})(Component);
