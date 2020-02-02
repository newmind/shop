
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { closeCart } from '../../ducks/commands';


const mapStateToProps = () => ({});

const mapActionToProps = (dispatch) => ({
  closeCart: bindActionCreators(closeCart, dispatch),
});

export default connect(
  mapStateToProps,
  mapActionToProps,
)(Component);
