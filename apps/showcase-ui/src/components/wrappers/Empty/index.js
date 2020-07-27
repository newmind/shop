
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Header = lazy(() => import('./Header'));


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
                <Suspense fallback={null}>
                  <Header />
                </Suspense>
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
