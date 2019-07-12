
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { setActiveTab } from '../ducks/commands';


const mapStateToProps = (state, props) => {
  const { tabsName } = props;
  const tabs = state['tabs']['tabs'][tabsName] || {};
  return {
    activeTab: tabs['activeTab'] || '',
  }
};

const mapActionsToProps = (dispatch, props) => {
  const { tabsName } = props;
  return {
    setActiveTab: bindActionCreators(setActiveTab.bind(null, tabsName), dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);