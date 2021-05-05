
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Contacts() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Header theme="light">Контакты</Header>
        <Text theme="light">Тут скоро будет новый раздел</Text>
      </div>
    </div>
  );
}

export default Contacts;
