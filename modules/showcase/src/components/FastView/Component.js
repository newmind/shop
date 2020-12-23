
import numeral from "@ui.packages/numeral";
import { Gallery } from "@ui.packages/kit";
import { nounDeclension } from "@ui.packages/utils";

import types from 'prop-types';
import { Link } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import cn from "classnames";
import styles from './default.module.scss';


const Properties = lazy(() => import('./Properties'));


function FastView({ cart, product: { uuid, gallery, name, brand, amount, currency, description, attributes }, addProductToCart, removeProductFromCart, product }) {
  function handleClickCart(event) {
    addProductToCart(product);
    event.preventDefault();
  }

  function handleRemoveFromCart(uuid) {
    removeProductFromCart(uuid);
  }

  const countInCart = cart.filter(item => item['uuid'] === uuid).length;
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return (
    <div className={styles['wrapper']}>
      <div className={styles['product']}>
        <div className={styles['gallery']}>
          <Gallery items={gallery} valueKey="externalId" path={ `${process.env['REACT_APP_API_HOST']}/gallery` } />
        </div>
        <div className={styles['common']}>
          <span className={styles['uuid']}>{ uuid }</span>
          <h3 className={styles['brand']}>{ brand }</h3>
          {name && <p className={styles['name']}>{ name }</p>}
          <p className={styles['amount']}>{ numeral(amount).format() } { currency['value'] }</p>
          <div className={styles['controls']}>
          <span className={styles['cart']} onClick={handleClickCart}>
            <span className={styles['cart__caption']}>Добавить в корзину</span>
            <span className="fas fa-shopping-cart" />
          </span>
            { !! countInCart && (
              <span className={removeFromCartClassName} onClick={handleRemoveFromCart.bind(this, uuid)} />
            )}
          </div>
          { !! countInCart && (
            <span className={styles['has-in-case']}>
            Уже {nounDeclension(countInCart, ['выбран', 'выбрано', 'выбрано'])} {countInCart} {nounDeclension(countInCart, ['товар', 'товара', 'товаров'])}.&nbsp;
              <Link className={styles['to-order']} to={process.env['PUBLIC_URL'] + '/order'}>Перейти к оформлению заказа</Link>
          </span>
          )}
          {description && (
            <div className={styles['description']}>
              <h3 className={styles['description__header']}>О товаре</h3>
              <p className={styles['paragraph']}>{ description }</p>
            </div>)}
        </div>
      </div>
      { !! attributes.length && (
        <div className={styles['property']}>
          <Suspense fallback={null}>
            <Properties list={attributes} />
          </Suspense>
        </div>
      )}
    </div>

  );
}

FastView.propTypes = {
  cart: types.array,
};

FastView.defaultProps = {
  cart: [],
};

export default FastView;
