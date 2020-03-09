
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = values => {
  let errors = {};

  if ( ! values['person']) {
    errors['person'] = 'Необходимо заполить';
  }

  if ( ! values['comment']) {
    errors['comment'] = 'Необходимо заполнить';
  }

  return errors;
};

export default reduxForm({
  form: 'comment-form',
  validate,
})(Component);