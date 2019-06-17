import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './Component';
import { closeDialog } from '../ducks/commands';

var mapActionsToProps = function mapActionsToProps(dispatch) {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

export default connect(null, mapActionsToProps)(Component);