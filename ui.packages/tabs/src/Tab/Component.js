
import types from 'prop-types';
import React, { PureComponent } from "react";

import cn from 'classnames';
import styles from "./defaults.module.scss";


class Comment extends PureComponent {
  static propTypes = {
    caption: types.string,
    name: types.string,
    tabs: types.object.isRequired,
    setActiveTab: types.func,
  };

  static contextTypes = {
    tabsName: types.string,
  };

  static defaultProps = {
    caption: 'No caption',
    name: '',
    tabs: {},
  };

  render() {
    const { tabsName } = this.context;
    const { name, tabs, caption, setActiveTab } = this.props;
    const activeTab = tabs[tabsName] && tabs[tabsName]['activeTab'];
    const classNameTab = cn(styles['tab'], {
      [styles['tab--active']]: activeTab === name,
    });
    return (
      <span className={classNameTab} onClick={setActiveTab.bind(this, tabsName, name)}>
        <span className={styles['tab__caption']}>{ caption }</span>
      </span>
    );
  }
}

export default Comment;