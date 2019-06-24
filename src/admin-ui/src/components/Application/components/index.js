
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './Component';

import { checkAuthState, changeInitial } from '../ducks/commands';


const mapStateToProps = (store) => {
  return {
    isAuth: store['application']['isAuth'],
    isInitializing: store['application']['isInitializing'],
  };
};

const mapActionsToProps = dispatch => ({
  changeInitial: bindActionCreators(changeInitial, dispatch),
  checkAuthState: bindActionCreators(checkAuthState, dispatch),
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Component));
