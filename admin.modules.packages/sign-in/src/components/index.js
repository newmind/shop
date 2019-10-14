
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isValid, isPristine, submit } from 'redux-form';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
  isPristine: isPristine('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {
    push: bindActionCreators(push, dispatch),
    submit: bindActionCreators(submit, dispatch),
    pageInProcess: bindActionCreators(pageInProcess, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }) => {
    pageInProcess(false)
  }
})(Component);