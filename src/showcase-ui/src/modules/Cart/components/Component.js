
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@packages/numeral';

import Product from './Product';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
  };

  static defaultProps = {
    products: [],
  };

  _calculateFullAmount() {
    const { products } = this.props;
    const fullAmount = products.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  render() {
    const { products } = this.props;
    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['header']}>Оформление заказа</h2>
        <div className={styles['list']}>
          <table className={styles['table']}>
            <thead className={styles['table__head']}>
              <tr className={styles['table__line']}>
                <th className={cn(styles['table__col'], styles['product'])}>
                  <span className={styles['table__header']}>Товар</span>
                </th>
                <th className={cn(styles['table__col'], styles['count'])}>
                  <span className={styles['table__header']}>Количество</span>
                </th>
                <th className={cn(styles['table__col'], styles['amount'])}>
                  <span className={styles['table__header']}>Цена</span>
                </th>
              </tr>
            </thead>
            <tbody className={styles['table__body']}>
              {products.map((product, index) => (
                <tr key={index} className={styles['table__line']}>
                  <td className={styles['table__col']}><Product {...product['product']} /></td>
                  <td className={cn(styles['table__col'], styles['count'])}>1</td>
                  <td className={cn(styles['table__col'], styles['amount'])}>{numeral(product['amount']).format()} {product['currency']['value']}</td>
                </tr>
              ))}
            </tbody>
            <caption className={styles['table__caption']}>Итого: { this._calculateFullAmount() } руб.</caption>
          </table>
        </div>
        <div className={styles['pay']}>
          <h2 className={styles['header']}>Способ оплаты</h2>
          <div>

          </div>
        </div>
        <div className={styles['address']}>
          <h2 className={styles['header']}>Адрес доставки</h2>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default Component;
