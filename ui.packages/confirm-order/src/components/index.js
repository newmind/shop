
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';


const mapStateToProps = state => {
  const Cart = state['cart'];
  return {
    items: Cart['items'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    push: bindActionCreators(push, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withRouter(Component));