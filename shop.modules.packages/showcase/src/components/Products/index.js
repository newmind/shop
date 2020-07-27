
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { fastViewProduct, addProductToCart } from '../../ducks/commands';


const mapStateToProps = (state) => ({
  items: state['showcase']['items'],
  meta: state['showcase']['meta']
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  fastViewProduct,
  addProductToCart,
}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
