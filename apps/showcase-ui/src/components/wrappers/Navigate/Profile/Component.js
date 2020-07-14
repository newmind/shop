
import React from 'react';
import { Link } from "react-router-dom";

import cn from 'classnames';
import styles from './default.module.scss';


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
      <Link className={styles['name']} to={process.env['PUBLIC_URL'] + '/profile'}>{ profile['name'] } { profile['surname'] }</Link>
      <div className={styles['exit']}>
        <span className={cn(styles['exit__icon'], 'fas fa-sign-out-alt')} onClick={onSignOut} />
      </div>
    </div>
  );
};
