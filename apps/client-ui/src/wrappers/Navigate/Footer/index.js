
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <p className={styles['paragraph']}>© <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>магазиночков.рф</Link> 2020. Все права защищены.<br/>Интернет-магазин очков, контактных линз, растворов и аксессуаров.</p>
        </div>
        <div className={styles['col']}>
          <p className={styles['paragraph']}>Приобретая медицинские товары проконсультируйтесь с врачом</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
