
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import Details from './Details';
import Products from './Products';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
    openDialog: types.func,
  };

  static defaultProps = {
    products: [],
  };

  _handleUpdateProduct(product) {
    const { updateProduct } = this.props;
    updateProduct(product);
  }

  _handleSubmitOrder(formData) {
    console.log(formData);
  }

  render() {
    const { products, submit } = this.props;
    const productsCount = Object.keys(products).length;
    return !! productsCount
      ? (
        <section className={styles['wrapper']}>
          <div className={styles['block']}>
            <h2 className={styles['block__header']}>Выбранные товары</h2>
            <div className={styles['block__content']}>
              <Products onUpdateProduct={this._handleUpdateProduct.bind(this)} />
            </div>
          </div>
          <div className={styles['block']}>
            <h2 className={styles['block__header']}>Оформление заказа</h2>
            <div className={styles['block__content']}>
              <Details onSubmit={this._handleSubmitOrder.bind(this)} />
            </div>
          </div>
          <div className={styles['block']}>
            <div className={styles['block__content']}>
              <Button mode="success" onClick={submit.bind(this, 'order')}>Оплатить заказ</Button>
            </div>
          </div>
        </section>
      )
     : (
       <div>Для оформления заказа необходимо выбрать товар</div>
     )
  }
}

export default Component;
