
import { Text } from '@ui.packages/kit';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <Text theme="light" className={styles['paragraph']}>© <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>{process.env['REACT_APP_WEBSITE_NAME']}</Link> 2020. Все права защищены.</Text>
        </div>
      </div>
    </div>
  );
}

export default Footer;
