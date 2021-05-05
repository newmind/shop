
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
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/client-about/payment'}>Оплата</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/client-about/delivery'}>Доставка</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/client-about/refund'}>Возврат</Link>
          </li>
          <li className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/contacts'}>Контакты</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Company;
