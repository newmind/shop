
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
