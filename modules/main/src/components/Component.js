
import React from 'react';

import Types from './Types';
import Categories from './Categories';

import styles from './default.module.scss';


export default function Page() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <article className={styles['types']}>
          <Types />
        </article>
        <article className={styles['categories']}>
          <Categories />
        </article>
      </div>
    </section>
  );
}
