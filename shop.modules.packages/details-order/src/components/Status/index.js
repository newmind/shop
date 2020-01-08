
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const order = state['details-order'];
  return {
    status: order['status'],
    delivery: order['delivery'],
  };
};

const mapActionsToProps = () => ({
});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
