
import PageHOC from '../../_bin/PageHOC';

import { bindActionCreators } from 'redux';
import { isValid } from 'redux-form';

import Component from './Component';
import { signIn, checkCookies } from '../ducks/commands';

const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    checkCookies: bindActionCreators(checkCookies, dispatch),
  };
};

export default PageHOC({
    mapStateToProps,
    mapActionsToProps,
    onEnter: ({ onLoading, checkCookies }) => {
      onLoading(false);
      checkCookies();
    },
  }
)(Component);