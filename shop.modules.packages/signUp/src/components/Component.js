
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
      <Suspense fallback={null}>
        <section className={styles['wrapper']}>
          <div className={styles['content']}>
            <SignUpForm onSubmit={this._handleSubmit.bind(this)} />
          </div>
        </section>
      </Suspense>
    );
  }
}

export default Component;
