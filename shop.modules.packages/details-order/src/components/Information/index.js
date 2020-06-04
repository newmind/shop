
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const order = state['details-order'];
  return {
    externalId: order['externalId'],
    address: order['address'],
    amount: order['amount'],
    name: order['name'],
    pay: order['pay'],
    surname: order['surname'],
    currency: order['currency'],
    createdAt: order['createdAt'],
  };
};

const mapActionsToProps = () => ({});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
