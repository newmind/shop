
import React from 'react';

import styles from './default.module.scss';


export default function Content({ children }) {
  return (
    <article id="scroller" className={styles['wrapper']}>
      { children }
    </article>
  );
}
