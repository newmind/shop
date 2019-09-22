
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';


const mapStateToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps, null)(Component));
