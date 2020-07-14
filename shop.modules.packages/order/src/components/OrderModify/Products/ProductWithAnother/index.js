
import { removeProduct } from '@ui.packages/cart';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';


const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = (dispatch) => ({
  removeProduct: bindActionCreators(removeProduct, dispatch),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);