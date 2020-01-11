
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const order = state['details-order'];
  return {
    externalId: order['externalId'],
    address: order['address'],
    amount: order['amount'],
    delivery: order['delivery'],
    email: order['email'],
    name: order['name'],
    pay: order['pay'],
    phone: order['phone'],
    surname: order['surname'],
    createdAt: order['createdAt'],
  };
};

const mapActionsToProps = () => ({});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
