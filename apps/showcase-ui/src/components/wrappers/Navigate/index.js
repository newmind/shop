
import types from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { PureComponent } from 'react';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Wrapper Navigate';

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
          <section className={styles['content']}>
            { children }
          </section>
        </section>
        <footer role="contentinfo" className={styles['footer']}>
          <div className={styles['center']}>
            <Footer />
          </div>
        </footer>
      </section>
    );
  }
}

export default withRouter(Component);
