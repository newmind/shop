
import { bindActionCreators } from 'redux';
import { reduxForm, reset, submit, isValid, isPristine } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { queryToObject } from "@ui.packages/utils";

import Component from './Component';


const validate = values => {
  const errors = {};

  if (values['amountFrom']) {
    if ( ! /^\d+(.\d{1,2})?$/.test(values['amountFrom'])) {
      errors['amountFrom'] = 'Неверный формат';
    }
  }
  if (values['amountTo']) {
    if ( ! /^\d+(.\d{1,2})?$/.test(values['amountTo'])) {
      errors['amountTo'] = 'Неверный формат';
    } else if (values['amountTo'] < values['amountFrom']) {
      errors['amountTo'] = 'Неверное значение';
    }
  }
  return errors;
};

const mapStateToProps = (state, props) => {
  const Showcase = state['Showcase'];
  const { location: { search }} = props;
  const query = queryToObject(search);
  return {
    categories: Showcase['categories'],
    brands: Showcase['brands'],
    initialValues: query,
    isValid: isValid('filter-showcase-ui')(state),
    isPristine: isPristine('filter-showcase-ui')(state),
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    reset: bindActionCreators(reset, dispatch),
    submit: bindActionCreators(submit, dispatch),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(reduxForm({
  form: 'filter-showcase-ui',
  validate,
})(Component)));