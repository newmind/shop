
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { closeNotification } from '../ducks/commands';


const mapStateToProps = state => ({
  notifications: state['notifications']['notifications'],
});

const mapActionsToProps = (dispatch) => {
  return {
    closeNotification: bindActionCreators(closeNotification, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);