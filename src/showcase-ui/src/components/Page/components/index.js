
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { setPage } from '../ducks/commands';


const mapStoreToAction = store => ({
  inProcess: store['page']['inProcess'],
});

const mapActionsToProps = dispatch => ({
  setPage: bindActionCreators(setPage, dispatch),
});

export default connect(mapStoreToAction, mapActionsToProps)(Component);
