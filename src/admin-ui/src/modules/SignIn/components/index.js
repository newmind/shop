
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { isValid, isPristine, submit } from 'redux-form';

import Component from './Component';
import { signIn, checkCookies } from '../ducks/commands';

const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
  isPristine: isPristine('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {
    submit: bindActionCreators(submit, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    checkCookies: bindActionCreators(checkCookies, dispatch),
  };
};

export default PageHOC({
    mapStateToProps,
    mapActionsToProps,
    onEnter: async ({ onLoading, checkCookies }) => {
      await checkCookies();
      onLoading(false);
    },
  }
)(Component);