
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header level={5} theme={'light'}>КОНТАКТЫ</Header>
          </div>
          <div className={styles['content']}>
            <Text theme={'light'}>г. Москва, пос. Московский, кв-л 32, влад. 17А стр. 1</Text>
          </div>
        </div>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header level={3} theme={'light'}>ПОМОЩЬ И ПОДДЕРЖКА</Header>
          </div>
          <div className={styles['content']}>

          </div>
        </div>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header level={3} theme={'light'}>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</Header>
          </div>
          <div className={styles['content']}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
