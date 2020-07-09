
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';
import {Link} from "react-router-dom";


export default ({ isAuth, profile, onSignIn, onSignOut }) => {

  if ( ! isAuth) {
    return (
      <div className={styles['profile']}>
        <span className={styles['sign-in']} onClick={onSignIn}>
          <span className={cn(styles['sign-in__icon'], 'fas fa-sign-in-alt')} />
          <span className={styles['sign-in__caption']}>Войти</span>
        </span>
        <Link className={styles['sign-up']} to={process.env['PUBLIC_URL'] + '/sign-up'}>
          <span className={cn(styles['sign-up__icon'], 'fas fa-user')}/>
          <span className={styles['sign-up__caption']}>Регистрация</span>
        </Link>
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
