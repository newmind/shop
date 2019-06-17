
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  const errors = {};

  if ( ! values['count']) {
    errors['count'] = 'Необходимо заполнить'
  }

  return errors;
};

export default reduxForm({
  form: 'modify-currency',
  validate,
})(Component);
