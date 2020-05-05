
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { closeDialog } from '../ducks/commands';


const mapStateToProps = state => {
  return {
    data: state['dialog']['data'],
    isOpen: state['dialog']['isOpen'],
    actionDialogName: state['dialog']['name'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);