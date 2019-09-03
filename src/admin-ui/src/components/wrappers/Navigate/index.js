
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Header from './Header';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  static contextTypes = {
    signOut: types.func,
  };

  _handleSignOut() {
    const { signOut } = this.context;
    signOut();
  }

  render() {

    const { children, navigate }  = this.props;
    return (
      <section className={styles['wrapper']}>
        <aside className={styles['aside']}>
          <div className={styles['aside__wrapper']}>
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
            <footer className={styles['footer']}>
              <span className={styles['sign-out']} onClick={this._handleSignOut.bind(this)}>Выйти</span>
            </footer>
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
