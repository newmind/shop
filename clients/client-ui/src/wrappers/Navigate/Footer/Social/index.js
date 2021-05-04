
import { Header } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Social() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4} theme={'light'}>МЫ В СОЦСЕТЯХ</Header>
      </div>
      <div className={styles['content']}>
        <ul className={styles['items']}>
          <li className={styles['item']}>
            <i className='fab fa-instagram-square' />
          </li>
          <li className={styles['item']}>
            <i className='fab fa-facebook' />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Social;
