
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

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
    push: bindActionCreators(push, dispatch),

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
)(withRouter(Component));