
import types from 'prop-types';
import React, { PureComponent } from "react";

import cn from 'classnames';
import styles from "./defaults.module.scss";


class Comment extends PureComponent {
  static propTypes = {
    to: types.string.isRequired,
    activeTab: types.string.isRequired,
  };

  static defaultProps = {
    to: '',
    activeTab: '',
  };

  render() {
    const { children, to, activeTab } = this.props;
    const isShow = activeTab === to;
    return isShow && (
      <div className={styles['container']}>
        { children }
      </div>
    );
  }
}

export default Comment;