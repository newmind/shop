
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
  };

  componentDidMount() {
    const { push } = this.props;
    const { isAuth } = this.context;
    if (isAuth) {
      push('/');
    }
  }

  onSubmit(data) {
    const { signIn } = this.props;
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
        <div className={styles['dialog']}>
          <div className={styles['dialog__header']}>
            <h3>Авторизация</h3>
          </div>
          <div className={styles['dialog__content']}>
            <Form onSubmit={this.onSubmit.bind(this)} />
          </div>
          <div className={styles['dialog__controls']}>
            <Button onClick={this._onSubmitForm.bind(this)} disabled={ ! isValid || isPristine}>Выполнить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
