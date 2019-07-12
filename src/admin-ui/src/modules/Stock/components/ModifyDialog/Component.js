
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import ProductForm from '../Form';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    categories: types.array,
    currencies: types.array,
    isValid: types.bool,
    isPristine: types.bool,
    initialValues: types.object,
    disabled: types.bool,
    onSubmit: types.func,
  };

  static defaultProps = {
    categories: [],
    currencies: [],
    isValid: false,
    isPristine: false,
    initialValues: {},
    disabled: false,
  };

  _handleSubmit() {
    const { submit } = this.props;
    submit('add-stock-product');
  }

  render() {
    const { inProcess, isValid, isPristine, initialValues, stock, currencies, categories, products, disabled, onSubmit } = this.props;
    const filteredProducts = products.filter(product => ! stock.some(item => item['product']['id'] === product['id']));

    return (
      <div className={styles['form']}>
        <div className={styles['content']}>
          <ProductForm initialValues={initialValues} categories={categories} currencies={currencies} products={filteredProducts} disable={ ! isValid || isPristine || inProcess || disabled} onSubmit={onSubmit} />
        </div>
        <div className={styles['controls']}>
          <Button mode="success" disabled={ ! isValid || isPristine || inProcess || disabled} onClick={this._handleSubmit.bind(this)}>Сохранить</Button>
        </div>
      </div>
    );
  }
}

export default Component;
