
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';


const mapStateToProps = () => ({});

const mapActionsToProps = () => ({});

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps,
)(Component));
