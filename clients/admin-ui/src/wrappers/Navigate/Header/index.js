
import { signOut, selectProfile } from '@ui.packages/application';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);

  async function handleSignOut() {
    const isSignOut = await dispatch(signOut(profile['id']));
    if (isSignOut) {
      navigate(process.env['PUBLIC_URL'] + '/sign-in');
    }
  }

  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-hands" />&nbsp;&nbsp;&nbsp;Ваш магазин</Link>
        </div>
      </div>
      <div className={styles['controls']}>
        <span className={styles['sign-out']} onClick={() => handleSignOut()}>Выйти</span>
      </div>
    </div>
  );
}
