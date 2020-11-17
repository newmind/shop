
import { Timeout } from '@ui.packages/timer';

import React, { useEffect } from 'react';
import types from 'prop-types';
import ReactDOM from 'react-dom';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Notification({ index, autoClose, onClose, timeout, title, content, mode }) {
  const timer = new Timeout();

  useEffect(() => {
    if (autoClose) {
      timer.start(() => handleClose(index), timeout);
    }
    return () => {

    };
  });

  function handleClose() {
    timer.reset();
    onClose(index);
  }

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
      <span className={classNameClose} onClick={handleClose} />
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

Notification.propTypes = {
  index: types.string,
  autoClose: types.bool,
  timeout: types.number,
  title: types.string,
  content: types.string,
  mode: types.oneOf(['default', 'success', 'primary', 'info', 'danger']),
  onClose: types.func,
};

Notification.defaultProps = {
  index: '',
  autoClose: true,
  timeout: 6,
  title: '',
  content: '',
  mode: 'default',
};

export default Notification;
