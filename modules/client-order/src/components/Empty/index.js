
import { Header, Text } from '@ui.packages/kit';

import React from 'react';
import { Link } from "react-router-dom";

import styles from "./default.module.scss";


function Empty() {
  return (
    <div className={styles['empty']}>
      <div className={styles['message']}>
        <Header level={2} theme="light">Нет выбранных товаров</Header>
      </div>
      <div className={styles['description']}>
        <Text theme="light">Перейти в раздел <Link className={styles['link']} to="/products">Каталог</Link></Text>
        <Text theme="light">для выбора товаров</Text>
      </div>
    </div>
  );
}

export default Empty;
