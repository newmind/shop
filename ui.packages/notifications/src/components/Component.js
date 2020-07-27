
import types from 'prop-types';
import ReactDOM from 'react-dom';
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
    mode: types.oneOf(['default', 'success', 'primary', 'info', 'danger']),
    onClose: types.func,
  };

  static defaultProps = {
    index: '',
    autoClose: true,
    timeout: 6,
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
      [styles['notification--success']]: (mode === 'success'),
      [styles['notification--danger']]: (mode === 'danger'),
      [styles['notification--info']]: (mode === 'info'),
      [styles['notification--primary']]: (mode === 'primary'),
    });
    const classNameIcon = cn(styles['icon'], {
      [styles['icon--primary']]: (mode === 'primary'),
      [styles['icon--success']]: (mode === 'success'),
      [styles['icon--info']]: (mode === 'info'),
      [styles['icon--danger']]: (mode === 'danger'),
    }, {
      'far fa-bookmark': (mode === 'primary'),
      'fas fa-exclamation-circle': (mode === 'danger'),
      'fas fa-exclamation': (mode === 'info'),
      'far fa-check-circle': (mode === 'success'),
    });

    return (
      <div className={classNameNotification}>
        <span className={classNameClose} onClick={this._handleClose.bind(this)} />
        <div className={styles['notification__icon']}>
          <span className={classNameIcon} />
        </div>
        <div className={styles['notification__block']}>
          {title && <span className={styles['notification__title']} role="header">{ title }</span>}
          {content && <span className={styles['notification__content']}>{ content }</span>}
        </div>
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

    return ReactDOM.createPortal(
      <div className={styles['notifications']}>
        <div className={styles['notifications__content']}>
          {notifications.map((notification) => {
            return <Notification key={notification['index']} {...notification} onClose={this._handleCloseByIndex.bind(this)} />
          })}
        </div>
      </div>
    , document.querySelector('#notification'));
  }
}

export default Component;
