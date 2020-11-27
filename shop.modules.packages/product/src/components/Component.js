
import numeral from '@ui.packages/numeral';
import { Dialog } from '@ui.packages/dialog';
import { nounDeclension } from "@ui.packages/utils";
import { Gallery, Breadcrumbs } from '@ui.packages/kit';

import types from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';

import cn from "classnames";
import styles from './default.module.scss';


const Comments = lazy(() => import(/* webpackChunkName: "product.comments" */'./Comments'));
const Properties = lazy(() => import(/* webpackChunkName: "showcase.properties" */'./Properties'));
const CommentModify = lazy(() => import(/* webpackChunkName: "showcase.properties" */'./CommentModify'));


function Product({ addProductToCart, getProductById, product, openDialog, closeDialog, createComment, removeProductFromCart, cart, initialValues }) {
  const params = useParams();

  useEffect(function init() {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - ${product['brand']} (${product['uuid']})`;
    document.querySelector('meta[name="description"]').setAttribute("content", product['description']);

    getProductById(params['id'])

  }, []);

  function handleClickCart(event) {
    event.preventDefault();

    addProductToCart(product);
  }

  function handleOpenCommentDialog() {
    openDialog('comment');
  }

  async function handleCreateComment(formData) {
    await createComment(product['uuid'], formData);
    closeDialog('comment');
  }

  function handleRemoveFromCart(uuid) {
    removeProductFromCart(uuid);
  }

  const countInCart = cart.filter(item => item['uuid'] === product['uuid']).length;
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return (
      <article className={styles['product']}>
        <div className={styles['breadcrumbs']}>
          <div className={styles['breadcrumbs__content']}>
            <Breadcrumbs
              items={[
                { title: 'Витрина', href: '/products' },
                { title: product['brand'] },
              ]}
            />
          </div>
        </div>
        <div className={styles['product__content']}>
          <div className={styles['product__common']}>
            <div className={styles['product__gallery']}>
              <Gallery items={product['gallery']} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
            </div>
            <div className={styles['product__commands']}>
              <span className={styles['product__uuid']}>{ product['uuid'] }</span>
              <h3 className={styles['product__brand']}>{ product['brand'] }</h3>
              {name && <p className={styles['product__name']}>{ name }</p>}
              <p className={styles['product__amount']}>{ numeral(product['amount']).format() } {product['currency']['value']}</p>
              <div className={styles['controls']}>
              <span className={styles['cart']} onClick={(event) => handleClickCart(event)}>
                <span className={styles['cart__caption']}>Добавить в корзину</span>
                <span className="fas fa-shopping-cart" />
              </span>
                { !! countInCart && (
                  <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart(product['uuid'])} />
                )}
              </div>
              { !! countInCart && (
                <span className={styles['has-in-case']}>
              Уже {nounDeclension(countInCart, ['выбран', 'выбрано', 'выбрано'])} {countInCart} {nounDeclension(countInCart, ['товар', 'товара', 'товаров'])}.&nbsp;
                  <Link className={styles['to-order']} to={process.env['PUBLIC_URL'] + '/order'}>Перейти к оформлению заказа</Link>
            </span>
              )}
              {product['description'] && (
                <div className={styles['product__description']}>
                  <h3 className={styles['product__description__header']}>О товаре</h3>
                  <p className={styles['paragraph']}>{ product['description'] }</p>
                </div>)}
            </div>
          </div>
          <div className={styles['features']}>
            {product['attributes'].length
              ? (
                <div className={styles['product__feature']}>
                  <h4 className={styles['header']}>Характеристика товара:</h4>
                  <div className={styles['product__list']}>
                    <Suspense fallback={null}>
                      <Properties list={product['attributes']} />
                    </Suspense>
                  </div>
                </div>
              )
              : null}
            <div className={styles['comments']}>
              <div className={styles['comments__controls']}>
                <h4 className={styles['comments__header']}>Отзывы о товаре {product['comments'].length ? <span className={styles['comments__count']}>({ product['comments'].length })</span> : null}</h4>
                <span className={styles['comments__link']} onClick={() => handleOpenCommentDialog()}>Оставить отзыв</span>
              </div>
              <div className={styles['comments__content']}>
                { !! product['comments'].length
                  ? (
                    <Suspense fallback={null}>
                      <Comments comments={product['comments']} />
                    </Suspense>
                  )
                  : <p className={styles['comments__empty']}>Отзывов о товаре еще нет</p>}
              </div>
            </div>
          </div>
        </div>
        <Dialog name="comment" title="Ваш отзыв о товаре">
          <Suspense fallback={null}>
            <CommentModify onSubmit={(data) => handleCreateComment(data)} initialValues={initialValues} />
          </Suspense>
        </Dialog>
      </article>
  );
}

Product.propTypes = {
  cart: types.array,
  product: types.object,
  initialValues: types.object,
  closeDialog: types.func,
  openDialog: types.func,
};

Product.defaultProps = {
  cart: [],
  product: {
    uuid: null,
    isSale: false,
    isHit: false,
    amount: 0.00,
    currency: {
      value: '',
    },
    comments: [],
    gallery: [],
    brand: 'None',
    name: 'None',
    description: '',
    attributes: [],
  },
};

export default Product;
