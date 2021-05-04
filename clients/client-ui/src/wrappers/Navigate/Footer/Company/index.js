
import { Header } from '@ui.packages/kit';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Company() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4} theme={'light'}>КОМПАНИЯ</Header>
      </div>
      <div className={styles['content']}>
        <ul className={styles['links']}>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Главная</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Оплата</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Доставка</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Возврат</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Контакты</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Company;
