
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createColor, updateColor, deleteColors } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['colors'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createColor,
  updateColor,
  deleteColors,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);