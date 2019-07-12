
import types from 'prop-types';
import React, { PureComponent } from "react";

import cn from 'classnames';
import styles from "./defaults.module.scss";


class Comment extends PureComponent {
  static propTypes = {
    caption: types.string,
    name: types.string.isRequired,
    activeTab: types.string.isRequired,
    setActiveTab: types.func,
  };

  static defaultProps = {
    caption: 'No caption',
    name: '',
    activeTab: '',
  };

  render() {
    const { caption, name, activeTab, setActiveTab } = this.props;
    const classNameTab = cn(styles['tab'], {
      [styles['tab--active']]: activeTab === name,
    });
    return (
      <span className={classNameTab} onClick={setActiveTab.bind(this, name)}>
        <span className={styles['tab__caption']}>{ caption }</span>
      </span>
    );
  }
}

export default Comment;