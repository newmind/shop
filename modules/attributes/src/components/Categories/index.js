
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createCategory, updateCategory, deleteCategories } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['categories'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createCategory,
  updateCategory,
  deleteCategories,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);