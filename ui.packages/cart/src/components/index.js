
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import {
  openCart,
  closeCart,

  removeProduct,

  resetCart,
  getCartFromLocalStorage,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Cart = state['cart'];
  return {
    items: Cart['items'],
    isOpen: Cart['isOpen'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    openCart: bindActionCreators(openCart, dispatch),
    closeCart: bindActionCreators(closeCart, dispatch),

    removeProduct: bindActionCreators(removeProduct, dispatch),

    resetCart: bindActionCreators(resetCart, dispatch),
    getCartFromLocalStorage: bindActionCreators(getCartFromLocalStorage, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
