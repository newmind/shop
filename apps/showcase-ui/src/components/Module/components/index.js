
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';

import Component from './Component';

import { pageInProcess } from "../ducks/commands";


const mapStoreToAction = (store) => ({
  inProcess: store['module']['inProcess'],
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
});

export default withRouter(connect(
  mapStoreToAction,
  mapActionsToProps,
)(Component));
