
import React from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";


function Option({ value, count }) {
  return (
    <span className={styles['option']}>
      <span className={styles['title']}>
        <span className={cn(styles['text'], { [styles['text--none']]: Number(count) === 0 })}>{ value }</span>
      </span>
      <span className={styles['count']}>{ count } поз.</span>
    </span>
  );
}

export default Option;
