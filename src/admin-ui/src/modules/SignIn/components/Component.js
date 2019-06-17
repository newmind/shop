
import React, { PureComponent } from 'react';
import { submit } from 'redux-form';

import Form from './Form';
import { Button } from '@packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  onSubmit(data) {
    console.log(data);
  }

  _onSubmitForm() {
    const { dispatch } = this.props;
    dispatch(submit('sign-in'));
  }

  render() {
    const { isValid } = this.props;
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
            <Button onClick={this._onSubmitForm.bind(this)} disabled={ ! isValid}>Выполнить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
