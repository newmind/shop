
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createUnit, updateUnit, deleteUnits } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['units'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createUnit,
  updateUnit,
  deleteUnits,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);