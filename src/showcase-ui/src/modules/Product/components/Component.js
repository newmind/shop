
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@packages/numeral';

import { Gallery } from '@packages/ui';
import { Dialog } from '@packages/dialog';

import Comments from './Comments';
import Properties from './Properties';
import Form from './Form';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    product: types.object,
    initialValues: types.object,
    closeDialog: types.func,
    openDialog: types.func,
  };

  static defaultProps = {
    product: {
      id: null,
      isSale: false,
      isHit: false,
      amount: 0.00,
      currency: {
        value: '',
      },
      comments: [],
      product: {
        id: null,
        gallery: [],
        brand: 'None',
        name: 'None',
        description: '',
        attributes: [],
      }
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
    const { product: { id }, createComment } = this.props;
    await createComment(id, formData);
    closeDialog('comment');
  }

  render() {
    const { product: { product, comments, amount, currency }, initialValues } = this.props;
    const { gallery, attributes, brand, name, description } = product;
    return (
      <article className={styles['product']}>
        <div className={styles['product__common']}>
          <div className={styles['product__gallery']}>
            <Gallery items={gallery} valueKey="file" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['product__commands']}>
            <h3 className={styles['product__brand']}>{ brand }</h3>
            <p className={styles['product__name']}>{ name }</p>
            <p className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</p>
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
        <div className={styles['features']}>
          {attributes.length
            ? (
              <div className={styles['product__feature']}>
                <h4 className={styles['header']}>Харастеристика товара:</h4>
                <div className={styles['product__list']}>
                  <Properties list={attributes} />
                </div>
              </div>
            )
            : null}
          <div className={styles['comments']}>
            <div className={styles['comments__controls']}>
              <h4 className={styles['comments__header']}>Отзывы о товаре{comments.length ? <span className={styles['comments__count']}>({comments.length})</span> : null}</h4>
              <span className={styles['comments__link']} onClick={this._handleOpenCommentDialog.bind(this)}>Оставить отзыв</span>
            </div>
            <div className={styles['comments__content']}>
              { !! comments.length
                ? <Comments comments={comments} />
                : <p className={styles['comments__empty']}>Отзывов о товаре еще нет</p>}
            </div>
          </div>
        </div>
        <Dialog name="comment" title="Ваш отзыв о товаре">
          <Form onSubmit={this._handleCreateComment.bind(this)} initialValues={initialValues} />
        </Dialog>
      </article>
    );
  }
}

export default Component;
