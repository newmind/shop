
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';


function mapStateToProps() {
  return {};
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
