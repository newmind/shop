
import Form from './Component';

import { reduxForm } from 'redux-form';


const validate = values => {
  let error = {};
  if ( ! values['login']) {
    error['login'] = 'Заполните поле';
  }
  if ( ! values['password']) {
    error['password'] = 'Заполните поле';
  }
  return error;
};


export default reduxForm({
  form: 'sign-in',
  validate,
})(Form);
