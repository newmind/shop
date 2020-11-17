
import React from 'react';
import types from 'prop-types';
import ReactDOM from 'react-dom';

import Notification from './Notification';

import styles from './defaults.module.scss';


function Notifications({ notifications, closeNotification }) {
  function handleCloseByIndex(index) {
    closeNotification(index);
  }

  return ReactDOM.createPortal(
    <div className={styles['notifications']}>
      <div className={styles['notifications__content']}>
        {notifications.map((notification) => {
          return <Notification key={notification['index']} {...notification} onClose={handleCloseByIndex} />
        })}
      </div>
    </div>
  , document.querySelector('#notification'));
}

Notifications.propTypes = {
  notifications: types.array,
  closeNotification: types.func,
};

Notifications.defaultProps = {
  notifications: [],
};

export default Notifications;
