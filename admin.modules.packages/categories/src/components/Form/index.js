
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо заполнить'
  }

  return errors;
};

export default reduxForm({
  form: 'modify-category',
  validate,
})(Component);
