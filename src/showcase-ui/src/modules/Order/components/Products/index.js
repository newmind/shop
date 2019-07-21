
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import Component from './Component';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = (dispatch) => ({
  openDialog: bindActionCreators(openDialog, dispatch),
  closeDialog: bindActionCreators(closeDialog, dispatch),
});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
