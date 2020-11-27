
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import styles from './default.module.scss';


function NotFound() {
  useEffect(function init() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Страница не найдена`;
  }, []);

  return (
    <div className="page">
      <div className={styles['wrapper']}>
        <span className={styles['code']}>404</span>
        <p className={styles['message']}>Страница не существует</p>
        <p className={styles['description']}>Перейти в раздел <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/products'}>выбора товаров</Link></p>
        <p className={styles['description']}>или <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/produce'}>напишите нам</Link> об ошибке</p>
      </div>
    </div>
  );
}

export default NotFound;
