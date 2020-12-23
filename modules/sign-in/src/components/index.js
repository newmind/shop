
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isValid, isPristine, submit } from 'redux-form';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
  isPristine: isPristine('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {
    submit: bindActionCreators(submit, dispatch),
    pageInProcess: bindActionCreators(pageInProcess, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
