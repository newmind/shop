
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './Component';

import { checkAuthState } from '../ducks/commands';


const mapStateToProps = (store) => {
  return {
    isInitializing: store['admin-ui-gw']['isInitializing'],
  };
};

const mapActionsToProps = dispatch => ({
  checkAuthState: bindActionCreators(checkAuthState, dispatch),
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Component));
