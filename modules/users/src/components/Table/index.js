
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  items: state['users']['items'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({

}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
