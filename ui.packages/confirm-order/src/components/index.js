
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const Cart = state['cart'];
  return {
    items: Cart['items'],
  }
};

const mapActionsToProps = () => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withRouter(Component));
