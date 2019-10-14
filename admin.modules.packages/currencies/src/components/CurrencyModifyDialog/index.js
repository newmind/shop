
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isPristine, isValid, submit } from 'redux-form';

import Component from './Component';


const mapStateToProps = state => {
  const currency = state['Currency'];
  return {
    inProcess: currency['inProcess'],
    isPristine: isPristine('modify-currency')(state),
    isValid: isValid('modify-currency')(state),
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    submit: bindActionCreators(submit, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);