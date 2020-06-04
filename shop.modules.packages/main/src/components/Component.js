
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Categories = lazy(() => import('./Categories'));


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Suspense fallback={null}>
        <section className={styles['wrapper']}>
          <div className={styles['content']}>
            <article className={styles['categories']}>
              <Categories />
            </article>
          </div>
        </section>
      </Suspense>
    );
  }
}

export default Component;
