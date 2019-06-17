
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import {
  openCart,
  closeCart,

  removeProduct
} from '../ducks/commands';


const mapStateToProps = state => {
  return {
    items: state['cart']['items'],
    isOpen: state['cart']['isOpen'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    openCart: bindActionCreators(openCart, dispatch),
    closeCart: bindActionCreators(closeCart, dispatch),
    removeProduct: bindActionCreators(removeProduct, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);