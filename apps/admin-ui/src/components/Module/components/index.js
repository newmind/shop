
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';

import { setProcess } from "../ducks/commands";


const mapStoreToAction = store => ({
  inProcess: store['module']['inProcess'],
});

const mapActionsToProps = dispatch => ({
  setProcess: bindActionCreators(setProcess, dispatch),
});

export default withRouter(connect(
  mapStoreToAction,
  mapActionsToProps,
)(Component));
