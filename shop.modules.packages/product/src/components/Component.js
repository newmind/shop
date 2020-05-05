
import { nounDeclension } from "@ui.packages/utils";
import numeral from '@ui.packages/numeral';
import { Gallery, Breadcrumbs } from '@ui.packages/ui';
import { Dialog } from '@ui.packages/dialog';

import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Comments from './Comments';
import Properties from './Properties';
import CommentModify from './CommentModify';

import styles from './default.module.scss';
import cn from "classnames";


class Component extends PureComponent {
  static propTypes = {
    cart: types.array,
    product: types.object,
    initialValues: types.object,
    closeDialog: types.func,
    openDialog: types.func,
  };

  static defaultProps = {
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

  _handleClickCart(event) {
    event.preventDefault();
    const { addProductToCart, product } = this.props;
    addProductToCart(product);
  }

  _handleOpenCommentDialog() {
    const { openDialog } = this.props;
    openDialog('comment');
  }

  async _handleCreateComment(formData) {
    const { closeDialog } = this.props;
    const { product: { uuid }, createComment } = this.props;
    await createComment(uuid, formData);
    closeDialog('comment');
  }

  _handleRemoveFromCart(uuid) {
    const { removeProductFromCart } = this.props;

    removeProductFromCart(uuid);
  }

  render() {
    const { cart, initialValues, product: { uuid, gallery, attributes, brand, name, description, comments, amount, currency }} = this.props;

    const countInCart = cart.filter(item => item['uuid'] === uuid).length;
    const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

    return (
      <article className={styles['product']}>
        <div className={styles['breadcrumbs']}>
          <div className={styles['breadcrumbs__content']}>
            <Breadcrumbs
              items={[
                { title: 'Витрина', href: '/' },
                { title: brand },
              ]}
            />
          </div>
        </div>
        <div className={styles['product__content']}>
          <div className={styles['product__common']}>
            <div className={styles['product__gallery']}>
              <Gallery items={gallery} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
            </div>
            <div className={styles['product__commands']}>
              <span className={styles['product__uuid']}>{ uuid }</span>
              <h3 className={styles['product__brand']}>{ brand }</h3>
              {name && <p className={styles['product__name']}>{ name }</p>}
              <p className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</p>
              <div className={styles['controls']}>
                <span className={styles['cart']} onClick={this._handleClickCart.bind(this)}>
                  <span className={styles['cart__caption']}>Добавить в корзину</span>
                  <span className="fas fa-shopping-cart" />
                </span>
                { !! countInCart && (
                  <span className={removeFromCartClassName} onClick={this._handleRemoveFromCart.bind(this, uuid)} />
                )}
              </div>
              { !! countInCart && (
                <span className={styles['has-in-case']}>
                Уже {nounDeclension(countInCart, ['выбран', 'выбрано', 'выбрано'])} {countInCart} {nounDeclension(countInCart, ['товар', 'товара', 'товаров'])}.&nbsp;
                  <Link className={styles['to-order']} to={process.env['PUBLIC_URL'] + '/order'}>Перейти к оформлению заказа</Link>
              </span>
              )}
              {description && (
                <div className={styles['product__description']}>
                  <h3 className={styles['product__description__header']}>О товаре</h3>
                  <p className={styles['paragraph']}>{ description }</p>
                </div>)}
            </div>
          </div>
          <div className={styles['features']}>
            {attributes.length
              ? (
                <div className={styles['product__feature']}>
                  <h4 className={styles['header']}>Характеристика товара:</h4>
                  <div className={styles['product__list']}>
                    <Properties list={attributes} />
                  </div>
                </div>
              )
              : null}
            <div className={styles['comments']}>
              <div className={styles['comments__controls']}>
                <h4 className={styles['comments__header']}>Отзывы о товаре {comments.length ? <span className={styles['comments__count']}>({ comments.length })</span> : null}</h4>
                <span className={styles['comments__link']} onClick={this._handleOpenCommentDialog.bind(this)}>Оставить отзыв</span>
              </div>
              <div className={styles['comments__content']}>
                { !! comments.length
                  ? <Comments comments={comments} />
                  : <p className={styles['comments__empty']}>Отзывов о товаре еще нет</p>}
              </div>
            </div>
          </div>
        </div>
        <Dialog name="comment" title="Ваш отзыв о товаре">
          <CommentModify onSubmit={this._handleCreateComment.bind(this)} initialValues={initialValues} />
        </Dialog>
      </article>
    );
  }
}

export default Component;
