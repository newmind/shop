
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@packages/ui';

import CurrencyForm from '../CurrencyForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    inProcess: types.bool,
    isValid: types.bool,
    isPristine: types.bool,
    initialValues: types.object,
    stock: types.array,
    products: types.array,
    disabled: types.bool,
    onSubmit: types.func,
  };

  static defaultProps = {
    inProcess: false,
    isValid: false,
    isPristine: false,
    initialValues: {},
    disabled: false,
  };

  _handleSubmit() {
    const { submit } = this.props;
    submit('modify-currency');
  }

  render() {
    const { inProcess, isValid, isPristine, initialValues, disabled, onSubmit } = this.props;
    return (
      <div className={styles['form']}>
        <div className={styles['content']}>
          <CurrencyForm initialValues={initialValues} disable={ ! isValid || isPristine || inProcess || disabled} onSubmit={onSubmit} />
        </div>
        <div className={styles['controls']}>
          <Button mode="success" disabled={ ! isValid || isPristine || inProcess || disabled} onClick={this._handleSubmit.bind(this)}>Сохранить</Button>
        </div>
      </div>
    );
  }
}

export default Component;
