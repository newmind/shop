
import types from 'prop-types';
import React, { PureComponent, Suspense, lazy } from 'react';

import styles from './default.module.scss';


const SignUpForm = lazy(() => import('./Form'));


class Component extends PureComponent {
  static propTypes = {
    signUp: types.func,
  };

  static defaultProps = {};

  _handleSubmit(formData) {
    const { signUp } = this.props;

    signUp(formData);
  }

  render() {
    return (
      <section className={styles['wrapper']}>
        <div className={styles['content']}>
          <header className={styles['header']}>
            <h2 className={styles['title']}>Регистрация</h2>
          </header>
          <Suspense fallback={null}>
            <SignUpForm onSubmit={this._handleSubmit.bind(this)} />
          </Suspense>
        </div>
      </section>
    );
  }
}

export default Component;
