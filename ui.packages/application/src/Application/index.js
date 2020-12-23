
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { signIn, signOut, getProfile } from '../ducks/commands';


function mapStateToProps(state) {
  return {
    isAuth: state['application']['isAuth'],
    inProcess: state['application']['inProcess'],
  };
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    signIn,
    signOut,
    getProfile,
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
