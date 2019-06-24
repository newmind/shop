
import PageHOC from '../../_bin/PageHOC';

import { bindActionCreators } from 'redux';
import { isValid } from 'redux-form';

import Component from './Component';
import { signIn } from '../ducks/commands';

const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
  };
};

export default PageHOC({
    mapStateToProps,
    mapActionsToProps,
    onEnter: ({ onLoading }) => {
      onLoading(false);
      console.log('onLoad');
    },
    onChange: () => {
      console.log('onChange');
    },
    onDestroy: () => {
      console.log('onDestroy');
    },
  }
)(Component);