import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './Component';
import { closeNotification } from '../ducks/commands';

var mapStateToProps = function mapStateToProps(state) {
  return {
    notifications: state['notifications']['notifications']
  };
};

var mapActionsToProps = function mapActionsToProps(dispatch) {
  return {
    closeNotification: bindActionCreators(closeNotification, dispatch)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Component);