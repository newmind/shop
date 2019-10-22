
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeCart, openCart } from "../../ducks/commands";

import Component from './Component';


const mapStateToProps = (state) => {
  const Cart = state['cart'];
  return {
    items: Cart['items'],
    isOpen: Cart['isOpen'],
  }
};

const mapActionsToProps = (dispatch) => ({
  openCart: bindActionCreators(openCart, dispatch),
  closeCart: bindActionCreators(closeCart, dispatch),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Component);