
import { Dialog } from '@ui.packages/dialog';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import SignInForm from './SignInForm';
import Profile from './Profile';

import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Wrapper Navigate';

  static contextTypes = {
    isAuth: types.bool,
    profile: types.object,
    navigate: types.array,
    signIn: types.func,
    signDialog: types.func,
  };

  render() {
    const { children }  = this.props;
    const { navigate, signDialog, signIn } = this.context;

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
                <div className={styles['menu']}>
                  <Navigation items={navigate} />
                </div>
                <div className={styles['controls']}>
                  <Profile
                    onSignIn={signDialog.bind(this)}
                    onSignOut={() => console.log(345678)}
                  />
                </div>
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
        <Dialog name="sign-in" title="Авторизация">
          <SignInForm onSubmit={signIn.bind(this)} />
        </Dialog>
      </section>
    );
  }
}

export default Component;
