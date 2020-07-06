
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default ({ isAuth, profile, onSignIn, onSignOut }) => {

  if ( ! isAuth) {
    return (
      <div className={styles['profile']}>
        <span className={styles['sign-in']} onClick={onSignIn}>
          <span className={styles['sign-in__caption']}>Войти</span>
          <span className={cn(styles['sign-in__icon'], 'fas fa-sign-in-alt')} />
        </span>
      </div>
    );
  }

  return (
    <div className={styles['profile']}>
      <span className={cn(styles['options'], 'fas fa-cog')} />
      <span className={styles['name']}>{ profile['name'] } { profile['surname'] }</span>
      <span className={cn(styles['exit'], 'fas fa-sign-out-alt')} onClick={onSignOut} />
    </div>
  );
};
