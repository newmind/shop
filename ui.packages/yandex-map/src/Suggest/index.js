
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';


const mapStateToProps = () => {
  return {}
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withRouter(Component));