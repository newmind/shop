
import React, { PureComponent } from 'react';

import Header from "./Header";
import Footer from "./Footer";

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children } = this.props;
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
        <footer className={styles['footer']}>
          <div className={styles['center']}>
            <Footer />
          </div>
        </footer>
      </section>
    );
  }
}

export default Component;
