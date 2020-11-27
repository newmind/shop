
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  pushSearch: bindActionCreators(push, dispatch),
  getTypes: bindActionCreators(getTypes, dispatch),
  getCategories: bindActionCreators(getCategories, dispatch),
});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
