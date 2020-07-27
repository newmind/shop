
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state, props) => {
  return {
    cart: state['cart']['items'],
    product: props['data'],
  };
};


export default connect(
  mapStateToProps,
  null,
)(Component);
