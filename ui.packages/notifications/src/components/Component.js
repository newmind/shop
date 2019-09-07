
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Timeout } from '@ui.packages/timer';

import cn from 'classnames';
import styles from './defaults.module.scss';


class Notification extends PureComponent {
  static propTypes = {
    index: types.string,
    autoClose: types.bool,
    timeout: types.number,
    title: types.string,
    content: types.string,
    mode: types.string,
    onClose: types.func,
  };

  static defaultProps = {
    index: '',
    autoClose: true,
    timeout: 4, // sec
    title: '',
    content: '',
    mode: 'default',
  };

  timeout = new Timeout();

  componentDidMount() {
    const { index, autoClose, timeout } = this.props;
    if (autoClose) {
      this.timeout.start(() => this._handleClose(index), timeout);
    }
  }

  _handleClose() {
    const { index, onClose } = this.props;
    this.timeout.reset();
    onClose(index);
  }

  render() {
    const { title, content, mode } = this.props;
    const classNameClose = cn('fas fa-times', styles['notification__close']);
    const classNameNotification = cn(styles['notification'], {
      [styles['notification--success']]: mode === 'success',
      [styles['notification--danger']]: mode === 'danger',
      [styles['notification--info']]: mode === 'info',
    });
    return (
      <div className={classNameNotification}>
        <span className={classNameClose} onClick={this._handleClose.bind(this)} />
        {title && <span className={styles['notification__title']} role="header">{ title }</span>}
        {content && <span className={styles['notification__content']}>{ content }</span>}
      </div>
    );
  }
}

class Component extends PureComponent {
  static propTypes = {
    notifications: types.array,
    closeNotification: types.func,
  };

  static defaultProps = {
    notifications: [],
  };

  _handleCloseByIndex(index) {
    const { closeNotification } = this.props;
    closeNotification(index);
  }

  render() {
    const { notifications } = this.props;
    return (
      <div className={styles['notifications']}>
        <div className={styles['notifications__content']}>
          {notifications.map((notification, ind) => {
            return <Notification key={notification['index']} {...notification} onClose={this._handleCloseByIndex.bind(this)} />
          })}
        </div>
      </div>
    );
  }
}

export default Component;
