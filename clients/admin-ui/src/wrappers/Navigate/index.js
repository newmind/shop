
import React, { useEffect } from 'react';

import Header from './Header';
import Navigation from './Navigation';

import styles from './default.module.scss';


export default function NavigateModule({ children }) {
  useEffect(() => {
    console.log('wrapper mount');
    return () => {
      console.log('wrapper unmount')
    }
  }, []);

  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header />
      </header>
      <section className={styles['container']}>
        <aside className={styles['navigate']}>
          <div className={styles['menu']}>
            <Navigation />
          </div>
        </aside>
        <section className={styles['content']}>
          { children }
        </section>
      </section>
    </section>
  );
}
