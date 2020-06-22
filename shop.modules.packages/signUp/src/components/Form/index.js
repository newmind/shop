
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['login']) {
    errors['login'] = 'Обязательно к заполнению';
  }
  else if ( ! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values['login'])) {
    errors['login'] = 'Неверный формат E-Mail';
  }

  if ( ! values['password']) {
    errors['password'] = 'Обязательно к заполнению';
  }

  if ( ! values['surname']) {
    errors['surname'] = 'Обязательно к заполнению';
  }

  if ( ! values['name']) {
    errors['name'] = 'Обязательно к заполнению';
  }

  return errors;
};


export default reduxForm({
  form: 'sign-up',
  validate,
})(Component);
