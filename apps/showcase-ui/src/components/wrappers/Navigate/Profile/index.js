
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  isAuth: state['application']['isAuth'],
  profile: state['application']['profile'],
});


export default connect(
  mapStateToProps,
  null,
)(Component);
