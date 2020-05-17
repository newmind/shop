
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { updateStatus } from '../../ducks/commands';


const mapStateToProps = (state) => ({
  items: state['orders']['items'],
  meta: state['orders']['meta'],
  statuses: state['orders']['statuses'],
  ordersInProcess: state['orders']['ordersInProcess'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  updateStatus,
}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
