
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change, getFormSyncErrors } from 'redux-form';

import { closeDialog, openDialog } from '@ui.packages/dialog';

import Component from './Component';


const mapStateToProps = (state) => {
  return {
    errors: getFormSyncErrors('order')(state),
  };
};

const mapActionsToProps = (dispatch) => ({
  change: bindActionCreators(change, dispatch),
  openDialog: bindActionCreators(openDialog, dispatch),
  closeDialog: bindActionCreators(closeDialog, dispatch),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);