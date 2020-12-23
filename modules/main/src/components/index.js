
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import {
  pageInProcess,
  getTypes,
  getCategories,
} from '../ducks/commands';


const mapStateToProps = (state) => ({
  inProcess: state['main']['inProcess'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,
  getTypes,
  getCategories,
}, dispatch);


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
