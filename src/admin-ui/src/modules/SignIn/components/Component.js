
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { submit } from 'redux-form';

import { Button } from '@packages/ui';

import Form from './Form';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isValid: types.bool,
    isPristine: types.bool,
  };

  static defaultProps = {
    isValid: false,
    isPristine: false,
  };

  onSubmit(data) {
    const { signIn } = this.props;
    signIn(data);
  }

  _onSubmitForm() {
    const { dispatch } = this.props;
    dispatch(submit('sign-in'));
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
