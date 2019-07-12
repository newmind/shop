
import { reduxForm } from 'redux-form';

import valid from '@ui.packages/validate';

import Component from './Component';


const validate = values => {
  let errors = {};
  const isRequiredName = valid(values['name']).require().check();
  if (isRequiredName) {
    errors['name'] = 'Необходимо к заполнению';
  }
  const isRequiredBrand = valid(values['brand']).require().check();
  if (isRequiredBrand) {
    errors['brand'] = 'Необходимо к заполнению';
  }
  const isRequiredAmount = valid(values['amount']).require().check();
  if (isRequiredAmount) {
    errors['amount'] = 'Необходимо к заполнению';
  }
  const isNumberAmount = valid(Number(values['amount'])).isNumber().check();
  if (isNumberAmount) {
    errors['amount'] = 'Неверный тип данных';
  }
  const isMinAmount = valid(values['amount']).min(0).check();
  if (isMinAmount) {
    errors['amount'] = 'Значение больше ноля';
  }
  return errors;
};


export default reduxForm({
  form: 'modify-product',
  enableReinitialize: true,
  validate,
})(Component);