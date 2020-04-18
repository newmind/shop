
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(
  mapStateToProps,
)(Component);