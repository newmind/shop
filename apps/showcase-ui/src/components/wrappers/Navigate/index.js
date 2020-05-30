
import types from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Header = lazy(() => import(/* webpackChunkName: "wrapper.navigation.header" */'./Header'));
const Footer = lazy(() => import(/* webpackChunkName: "wrapper.navigation.footer" */'./Footer'));
const Navigation = lazy(() => import(/* webpackChunkName: "wrapper.navigation.navigate" */'./Navigation'));


class Component extends PureComponent {
  static contextTypes = {
    navigate: types.array,
  };

  render() {
    const { children }  = this.props;
    const { navigate } = this.context;

    return (
      <Suspense fallback={null}>
        <section className={styles['wrapper']}>
          <section className={styles['page']}>
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
              { children }
            </article>
          </section>
          <footer className={styles['footer']}>
            <div className={styles['center']}>
              <Footer />
            </div>
          </footer>
        </section>
      </Suspense>
    );
  }
}

export default withRouter(Component);
