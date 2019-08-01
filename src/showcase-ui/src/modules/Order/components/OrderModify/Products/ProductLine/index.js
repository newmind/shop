
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, getFormValues } from 'redux-form';

import Component from './Component';

import { closeDialog, openDialog } from "@ui.packages/dialog";


const mapStateToProps = state => {
  return {
    values: getFormValues('order')(state),
  };
};

const mapActionsToProps = (dispatch) => ({
  onChange: bindActionCreators(change, dispatch),
  openDialog: bindActionCreators(openDialog, dispatch),
  closeDialog: bindActionCreators(closeDialog, dispatch),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);