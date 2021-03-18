
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './defaul.module.scss';


function About() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Header theme="light">О нас</Header>
        <Text theme="light">Тут скоро будет новый раздел</Text>
      </div>
    </div>
  );
}

export default About;
