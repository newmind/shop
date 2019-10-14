
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import { closeDialog, openDialog } from '@ui.packages/dialog';

import Component from './Component';


const mapStateToProps = () => {
  return {};
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