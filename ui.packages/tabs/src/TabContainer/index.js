
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state, props) => {
  const { tabsName } = props;
  const tabs = state['tabs']['tabs'][tabsName] || {};
  return {
    activeTab: tabs['activeTab'] || '',
  }
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);