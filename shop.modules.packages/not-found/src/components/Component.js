
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
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
}

export default Component;