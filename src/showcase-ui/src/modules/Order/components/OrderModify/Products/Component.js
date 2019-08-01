
import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';

import { nounDeclension } from "@ui.packages/utils";
import numeral from '@ui.packages/numeral';

import ProductLine from './ProductLine';

import cn from 'classnames';
import styles from './default.module.scss';




class Component extends PureComponent {

  _calculateFullAmount() {
    const { products } = this.props;
    const fullAmount = products.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  render() {
    const { products, ...props } = this.props;
    const productsCount = Object.keys(products).length;
    return (
      <table className={styles['table']}>
        <thead className={styles['table__head']}>
          <tr className={styles['table__line']}>
            <th className={cn(styles['table__col'], styles['product'])}>
              <span className={styles['table__header']}>{productsCount} {nounDeclension(productsCount, ['Товар', 'Товара', 'Товаров'])}</span>
            </th>
            <th className={cn(styles['table__col'], styles['recipe'])}>
              <span className={styles['table__header']}>Рецепт</span>
            </th>
            <th className={cn(styles['table__col'], styles['amount'])}>
              <span className={styles['table__header']}>Цена</span>
            </th>
            <th style={{width: 0}} />
          </tr>
        </thead>
        <FieldArray name="products" component={ProductLine} {...props} />
        <caption className={styles['table__caption']}>Итого: { this._calculateFullAmount() } руб.</caption>
      </table>
    );
  }
}

export default Component;
