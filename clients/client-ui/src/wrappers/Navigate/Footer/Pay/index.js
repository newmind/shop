
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Pay() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4} theme={'light'}>ПРИНИМАЕМ К ОПЛАТЕ</Header>
      </div>
      <div className={styles['content']}>
        <ul className={styles['items']}>
          <li className={styles['item']}>
            <i className='fab fa-cc-visa' />
          </li>
          <li className={styles['item']}>
            <i className='fab fa-cc-mastercard' />
          </li>
          <li className={styles['item']}>
            <i className='fab fa-cc-mastercard' />
          </li>
        </ul>
        <Text theme={'light'} type={Text.TYPE_COMMENT}>Прием платежей производится через сервис <a className={styles['link']} href={'https://pikassa.io'}>Pikassa</a></Text>
      </div>
    </div>
  );
}

export default Pay;
