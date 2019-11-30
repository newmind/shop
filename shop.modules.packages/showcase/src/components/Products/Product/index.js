
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  cart: state['cart']['items'],
});

const mapActionsToProps = () => ({});


export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(Component));