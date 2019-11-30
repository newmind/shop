
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  static contextTypes = {
    navigate: types.array,
  };

  render() {
    const { children }  = this.props;
    const { navigate } = this.context;

    return (
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
    );
  }
}

export default withRouter(Component);
