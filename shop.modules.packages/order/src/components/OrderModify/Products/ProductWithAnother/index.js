
import { removeProduct } from '@ui.packages/cart';
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';


const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  removeProduct,
  openDialog,
  closeDialog,
}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);