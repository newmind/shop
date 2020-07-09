
import React, { PureComponent } from 'react';

import Header from "./Header";

import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Wrapper Empty';

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
      </section>
    );
  }
}

export default Component;
