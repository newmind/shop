
import { Dialog } from '@ui.packages/dialog';

import types from 'prop-types';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const Profile = lazy(() => import('./Profile'));
const Navigation = lazy(() => import('./Navigation'));
const SignInForm = lazy(() => import('./SignInForm'));


class Component extends PureComponent {
  static displayName = 'Wrapper Navigate';

  static contextTypes = {
    isAuth: types.bool,
    profile: types.object,
    navigate: types.array,
    signIn: types.func,
    signOut: types.func,
    signDialog: types.func,
  };

  render() {
    const { children }  = this.props;
    const { navigate, signDialog, signIn, signOut } = this.context;

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
            <div className={styles['navigate']}>
              <div className={styles['center']}>
                <div className={styles['menu']}>
                  <Suspense fallback={null}>
                    <Navigation items={navigate} />
                  </Suspense>
                </div>
                <div className={styles['controls']}>
                  <Suspense fallback={null}>
                    <Profile
                      onSignIn={signDialog.bind(this)}
                      onSignOut={signOut.bind(this)}
                    />
                  </Suspense>
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
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </footer>
        <Suspense fallback={null}>
          <Dialog name="sign-in" title="Войти в личный кабинет">
            <SignInForm onSubmit={signIn.bind(this)} />
          </Dialog>
        </Suspense>
      </section>
    );
  }
}

export default Component;
