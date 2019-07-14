
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
    onChange: types.func,
  };

  static defaultProps = {
    caption: 'No caption',
    name: '',
    tabs: {},
  };

  _handleSetActiveTab() {
    const { tabsName, onChange } = this.context;
    const { name } = this.props;
    const { setActiveTab } = this.props;
    onChange(name);
    setActiveTab(tabsName, name)
  }

  render() {
    const { tabsName } = this.context;
    const { name, tabs, caption } = this.props;
    const activeTab = tabs[tabsName] && tabs[tabsName]['activeTab'];
    const classNameTab = cn(styles['tab'], {
      [styles['tab--active']]: activeTab === name,
    });
    return (
      <span className={classNameTab} onClick={this._handleSetActiveTab.bind(this)}>
        <span className={styles['tab__caption']}>{ caption }</span>
      </span>
    );
  }
}

export default Comment;