
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

  const itemsErrors = [];
  if (values['items']) {
    values['items'].forEach((item, index) => {
      const itemErrors = {};
      if (item['type'] === 'on-prescription') {
        if ( ! Object.keys(item['recipe']).length) {
          itemErrors['recipe'] = 'Необходимо заполнить';
          itemsErrors[index] = itemErrors;
        }
        if ( ! Object.keys(item['lens']).length) {
          itemErrors['lens'] = 'Необходимо сделать выбор';
          itemsErrors[index] = itemErrors;
        }
      }
    });
  }

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

  if (!!itemsErrors.length) {
    errors['items'] = itemsErrors;
  }

  return errors;
};


export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'order',
  enableReinitialize: true,
  validate,
})(Component));