
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './Component';

import { getProfile, changeState } from '../ducks/commands';


const mapStateToProps = (store) => {
  const App = store['application'];
  return {
    isInit: App['isInit'],
    profile: App['profile'],
  };
};

const mapActionsToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  changeState: bindActionCreators(changeState, dispatch),
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Component));

