
import React, { PureComponent } from 'react';

import Header from './Header';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, navigate }  = this.props;
    return (
      <section className={styles['wrapper']}>
        <aside className={styles['aside']}>
          <header className={styles['header']}>
            <div className={styles['center']}>
              <Header />
            </div>
          </header>
          <div className={styles['navigate']}>
            <div className={styles['center']}>
              <Navigation items={navigate} />
            </div>
          </div>
        </aside>
        <article className={styles['content']}>
          <div className={styles['center']}>
            { children }
          </div>
        </article>
      </section>
    );
  }
}

export default Component;
