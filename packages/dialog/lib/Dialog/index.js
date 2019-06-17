import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './Component';
import { closeDialog } from '../ducks/commands';

var mapStateToProps = function mapStateToProps(state) {
  return {
    isOpen: state['dialog']['isOpen'],
    actionDialogName: state['dialog']['name']
  };
};

var mapActionsToProps = function mapActionsToProps(dispatch) {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Component);