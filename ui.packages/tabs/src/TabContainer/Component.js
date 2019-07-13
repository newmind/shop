
import types from 'prop-types';
import React, { PureComponent } from "react";

import styles from "./defaults.module.scss";


class Comment extends PureComponent {
  static propTypes = {
    to: types.string.isRequired,
    tabs: types.object.isRequired,
  };

  static contextTypes = {
    tabsName: types.string,
  };

  static defaultProps = {
    to: '',
    tabs: {},
  };

  render() {
    const { tabsName } = this.context;
    const { children, to, tabs } = this.props;
    const activeTab = tabs[tabsName] && tabs[tabsName]['activeTab'];
    const isShow = activeTab === to;
    return isShow && (
      <div className={styles['container']}>
        { children }
      </div>
    );
  }
}

export default Comment;