
import { validation } from '@ui.packages/utils';

import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};
  const itemsErrors = [];

  if (values['items']) {
    values['items'].forEach((item, index) => {
      const itemErrors = {};
      if (item['params'] === 'further') {
        if (item['productType'] === 'on-prescription') {
          if ( ! item['recipe'] || ! Object.keys(item['recipe']).length) {
            itemErrors['recipe'] = 'Необходимо заполнить';
            itemsErrors[index] = itemErrors;
          }
          if ( ! item['lens'] || ! Object.keys(item['lens']).length) {
            itemErrors['lens'] = 'Необходимо сделать выбор';
            itemsErrors[index] = itemErrors;
          }
        }
      }
    });
  }

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
    errors['address'] = 'Необходимо ввести точный адресс доставки';
  }

  if ( !! itemsErrors.length) {
    errors['items'] = itemsErrors;
  }

  return errors;
};


export default reduxForm({
  form: 'order',
  validate,
})(Component);
