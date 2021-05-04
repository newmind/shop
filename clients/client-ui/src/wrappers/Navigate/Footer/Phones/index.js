
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Phones() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4} theme={'light'}>ТЕЛЕФОНЫ</Header>
      </div>
      <div className={styles['content']}>
        <ul className={styles['items']}>
          <li className={styles['item']}>
            <div className={styles['label']}>
              <Text theme={'light'} type={Text.TYPE_COMMENT}>Интернет-магазин</Text>
            </div>
            <div className={styles['value']}>
              <Header theme={'light'} level={2}>+7 (999) 999-99-99</Header>
            </div>
          </li>
          <li className={styles['item']}>
            <div className={styles['label']}>
              <Text theme={'light'} type={Text.TYPE_COMMENT}>Тех. поддержка</Text>
            </div>
            <div className={styles['value']}>
              <Header theme={'light'} level={2}>+7 (888) 888-88-88</Header>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Phones;
