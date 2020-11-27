
import React from 'react';

import styles from "./default.module.scss";


function Option({ value, count }) {
  return (
    <span className={styles['option']}>
      <span className={styles['title']}>
        <span className={styles['text']}>{ value }</span>
      </span>
      <span className={styles['count']}>{ count } поз.</span>
    </span>
  );
}

export default Option;
