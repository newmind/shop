
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import Form from './Form';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isValid: types.bool,
    isPristine: types.bool,
    push: types.func,
  };

  static defaultProps = {
    isValid: false,
    isPristine: false,
  };

  static contextTypes = {
    isAuth: types.bool,
    signIn: types.func,
  };

  componentDidMount() {
    const { push } = this.props;
    const { isAuth } = this.context;
    if (isAuth) {
      push('/');
    }
  }

  onSubmit(data) {
    const { signIn } = this.context;
    signIn(data);
  }

  _onSubmitForm() {
    const { submit } = this.props;
    submit('sign-in');
  }

  render() {
    const { isValid, isPristine } = this.props;
    return (
      <div className="page">
        <div className={styles['wrapper']}>
          <div className={styles['dialog']}>
            <h2 className={styles['header']}>Авторизация</h2>
            <div className={styles['dialog__content']}>
              <Form onSubmit={this.onSubmit.bind(this)} />
            </div>
            <div className={styles['dialog__controls']}>
              <Button
                mode="success"
                disabled={ ! isValid || isPristine}
                onClick={this._onSubmitForm.bind(this)}>Выполнить</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
