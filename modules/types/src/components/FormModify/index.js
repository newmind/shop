
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['value']) {
    errors['value'] = 'Необходимо заполнить';
  }

  return errors;
};

const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      ...props['data'],
      categories: props['data'] ? props['data']['categories'].map((category) => category['id']) : [],
    },
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'types-modify',
  validate,
  enableReinitialize: true,
})(Component));
