
import React from 'react';

import Header from './Header';

import styles from './default.module.scss';


function Empty({ children }) {
  return (
    <section className={styles['wrapper']}>
      <section className={styles['page']}>
        <aside className={styles['aside']}>
          <header className={styles['header']}>
            <div className={styles['center']}>
              <Header />
            </div>
          </header>
        </aside>
        <article className={styles['content']}>
          { children }
        </article>
      </section>
    </section>
  );
}

export default Empty;
