
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { addProductToCart, removeProductFromCart } from '../../ducks/commands';


const mapStateToProps = (state, props) => ({
  cart: state['cart']['items'],
  product: props['data'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  addProductToCart,
  removeProductFromCart,
}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
