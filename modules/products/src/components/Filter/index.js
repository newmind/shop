
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const mapStateToProps = (state) => ({
  ...state['products']['filter'],
});


export default connect(
  mapStateToProps,
  null,
)(reduxForm({
  form: 'product-filter',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(Component));
