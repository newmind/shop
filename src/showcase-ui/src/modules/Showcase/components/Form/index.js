
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = state => {
  return {
    product: state['dialog']['data']
  }
};

const mapActionsToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(Component));