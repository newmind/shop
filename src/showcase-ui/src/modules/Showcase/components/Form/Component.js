
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@packages/numeral';

import { Gallery } from '@packages/ui';

import Properties from './Properties';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    product: types.object,
    initialValues: types.object,
    comments: types.array,
    closeDialog: types.func,
    openDialog: types.func,
  };

  static defaultProps = {
    product: {
      isSale: false,
      isHit: false,
      id: null,
      gallery: [],
      amount: 0.00,
      brand: 'None',
      name: 'None',
      description: '',
      attributes: []
    },
  };

  _handleClickCart(event) {
    event.preventDefault();
    const { onCart, product } = this.props;
    onCart && onCart(product);
  }

  render() {
    const { product: { gallery, amount, brand, name, description, attributes }} = this.props;
    return (
      <article className={styles['product']}>
        <div className={styles['product__common']}>
          <div className={styles['product__gallery']}>
            <Gallery items={gallery} valueKey="file" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['product__commands']}>
            <h3 className={styles['product__brand']}>{ brand }</h3>
            <p className={styles['product__name']}>{ name }</p>
            <p className={styles['product__amount']}>{ numeral(amount).format() } руб.</p>
            <span className={styles['cart']} onClick={this._handleClickCart.bind(this)}>
              <span className={styles['cart__caption']}>Добавить в корзину</span>
              <span className="fas fa-shopping-cart" />
            </span>
            <div className={styles['product__description']}>
              <h3 className={styles['product__description__header']}>О товаре</h3>
              <p className={styles['paragraph']}>{ description }</p>
            </div>
          </div>
        </div>
        <div className={styles['product__feature']}>
          <h4 className={styles['header']}>Харастеристика товара:</h4>
          <div className={styles['product__list']}>
            <Properties list={attributes} />
          </div>
        </div>
      </article>
    );
  }
}

export default Component;
