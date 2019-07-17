
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Dialog } from '@ui.packages/dialog';
import numeral from '@ui.packages/numeral';
import { Button } from '@ui.packages/ui';

import RecipeModify from './RecipeModify';
import Product from './Product';
import Order from './Order';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
    openDialog: types.func,
  };

  static defaultProps = {
    products: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }

  _handleOpenDialogRecipe(product) {
    const { openDialog } = this.props;
    this.setState({ product }, () => openDialog('recipe'));
  }

  _calculateFullAmount() {
    const { products } = this.props;
    const fullAmount = products.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  _handleCloseDialog() {
    this.setState({ product: null });
  }

  _handleSetRecipeToProduct(formData) {
    console.log(formData);

  }

  _handleSubmitOrder(formData) {
    console.log(formData);
  }

  render() {
    const { product = {} } = this.state;
    const { products, submit } = this.props;
    return Object.keys(products).length
      ? (
        <div className={styles['wrapper']}>
          <h2 className={styles['header']}>Оформление заказа</h2>
          <div className={styles['list']}>
            <table className={styles['table']}>
              <thead className={styles['table__head']}>
                <tr className={styles['table__line']}>
                  <th className={cn(styles['table__col'], styles['product'])}>
                    <span className={styles['table__header']}>Товар</span>
                  </th>
                  <th className={cn(styles['table__col'], styles['recipe'])}>
                    <span className={styles['table__header']}>Рецепт</span>
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
                    <td className={styles['table__col']} style={{ textAlign: 'center' }}>
                      {product['recipe']
                        ? null
                        : <Button onClick={this._handleOpenDialogRecipe.bind(this, product)}>Добавить рецепт</Button>}
                    </td>
                    <td className={cn(styles['table__col'], styles['amount'])}>{numeral(product['amount']).format()} {product['currency']['value']}</td>
                  </tr>
                ))}
              </tbody>
              <caption className={styles['table__caption']}>Итого: { this._calculateFullAmount() } руб.</caption>
            </table>
          </div>
          <div>
            <Order onSubmit={this._handleSubmitOrder.bind(this)} />
          </div>
          <div>
            <Button mode="success" onClick={submit.bind(this, 'order')}>Оплатить заказ на сумму { this._calculateFullAmount() } руб.</Button>
          </div>
          <Dialog name="recipe" title="Рецепт">
            <RecipeModify
              product={product}
              initialValues={product['recipe'] || {}}
              onSubmit={this._handleSetRecipeToProduct.bind(this)}
              onClose={this._handleCloseDialog.bind(this)}
            />
          </Dialog>
        </div>
      )
     : (
       <div>Для оформления заказа необходимо выбрать товар</div>
     )
  }
}

export default Component;
