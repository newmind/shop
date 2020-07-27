
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { fastViewProduct } from '../../../ducks/commands';


const mapStateToProps = (state) => ({
  cart: state['cart']['items'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  fastViewProduct,
}, dispatch);


export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(Component));