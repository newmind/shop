
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createTabs, removeTabs, setActiveTab } from '../ducks/commands';


const mapStateToProps = state => {
  return {
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    createTabs: bindActionCreators(createTabs, dispatch),
    removeTabs: bindActionCreators(removeTabs, dispatch),
    setActiveTab: bindActionCreators(setActiveTab, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);