
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createMaterial, updateMaterial, deleteMaterials } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['materials'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createMaterial,
  updateMaterial,
  deleteMaterials,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);