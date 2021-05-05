
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  const errors = {};

  if ( ! values['login']) {
    errors['login'] = 'Необходимо заполнить'
  }

  return errors;
};

export default reduxForm({
  form: 'common-settings',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate,
})(Component);
