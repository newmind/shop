
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const mapStateToProps = (state) => {
  const cart = state['cart'];
  return {
    initialValues: {
      products: cart['items'],
      name: '',
      surname: '',
      phone: '',
      email: '',
      delivery: 'post',
      pay: 'cash',
      news: false,
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