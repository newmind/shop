
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createForm, updateForm, deleteForms } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['forms'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createForm,
  updateForm,
  deleteForms,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);