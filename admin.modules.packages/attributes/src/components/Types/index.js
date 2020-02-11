
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createType, updateType, deleteTypes } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['types'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createType,
  updateType,
  deleteTypes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);