
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо заполнить'
  }

  if ( ! values['email']) {
    errors['email'] = 'Необходимо заполнить'
  }

  if ( ! values['phone']) {
    errors['phone'] = 'Необходимо заполнить'
  }

  if ( ! values['birthday']) {
    errors['birthday'] = 'Необходимо заполнить'
  }

  return errors;
};

export default reduxForm({
  form: 'profile',
  enableReinitialize: true,
  validate,
})(Component);
