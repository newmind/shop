
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  cart: state['cart']['items'],
});


export default connect(
  mapStateToProps,
  null,
)(Component);
