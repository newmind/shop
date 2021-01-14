
import { Text, Link } from '@ui.packages/kit';

import React from 'react';

import styles from './defaults.module.scss';


function Empty() {
  return (
    <span className={styles['empty']}>
      <Text>В карзине нет выбранных товаров<br/>
        перейдите в раздел <Link href={'/products'}>Витрина</Link> для выбора товаров</Text>
    </span>
  );
}

Empty.propTypes = {};

Empty.defaultProps = {};

export default Empty;
