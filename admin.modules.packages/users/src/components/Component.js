
// import types from 'prop-types';
import React, { lazy, Suspense, PureComponent } from 'react';

const Table = lazy(() => import('./Table'));

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Suspense fallback={null}>
        <div className="page">
          <div className={styles['wrapper']}>
            <div className={styles['header']}>
              <h2>Пользователи</h2>
            </div>
            <div className={styles['content']}>
              <Table />
            </div>
            <div className={styles['controls']}>

            </div>
          </div>
        </div>
      </Suspense>
    );
  }
}

export default Component;
