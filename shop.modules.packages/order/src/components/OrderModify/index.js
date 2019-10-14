
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const mapStateToProps = (state) => {
  const cart = state['cart'];
  return {
    items: cart['items'],
    initialValues: {
      items: cart['items'],
      delivery: 'post',
      pay: 'cash',
    },
  };
};

const validate = (values) => {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо заполнить';
  }

  if ( ! values['surname']) {
    errors['surname'] = 'Необходимо заполнить';
  }

  if ( ! values['phone']) {
    errors['phone'] = 'Необходимо заполнить';
  }

  if ( ! values['email']) {
    errors['email'] = 'Необходимо заполнить';
  }

  return errors;
};


export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'order',
  validate,
})(Component));