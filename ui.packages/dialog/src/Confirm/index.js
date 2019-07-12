
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { closeDialog } from '../ducks/commands';


const mapActionsToProps = (dispatch) => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch),
  };
};

export default connect(
  null,
  mapActionsToProps,
)(Component);