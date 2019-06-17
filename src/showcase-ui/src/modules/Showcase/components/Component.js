
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { reduceToArray, objectToQuery } from '@packages/utils';

import Product from './Product';
import Form from './Form';

import Filter from './Filter';
import Dialog from '../../../components/Dialog/components';

import styles from './default.module.scss';

const SIZE = 3;


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    count: types.number,
    paging: types.shape({
      page: types.number,
      pages: types.number,
    }),
    addProductToCart: types.func,
  };

  static defaultProps = {
    items: [],
    paging: {
      page: 1,
      pages: 1,
    },
    count: 0,
  };

  _handleLoadingMore() {
    const { getProducts, paging: { page } } = this.props;
    const newPage = page + 1;
    getProducts(newPage);
  }

  _handleFastView(product) {
    const { openDialog } = this.props;
    openDialog(product);
  }

  _handleCart(product) {
    const { addProductToCart } = this.props;
    addProductToCart(product);
  }

  _handleFilter(formData) {
    const { getProducts, pushSearch } = this.props;
    pushSearch({
      path: '/product',
      search: objectToQuery(formData),
    });
    getProducts(formData);
  }

  render() {
    const { items, count, initialValues} = this.props;
    const products = reduceToArray(items, SIZE);

    return (
      <section className={styles['wrapper']}>
        <aside className={styles['filters']}>
          <Filter initialValues={initialValues} onSubmit={this._handleFilter.bind(this)} />
        </aside>
        <section className={styles['products']}>
          {products.map((lineWithProducts, index) => {
            return (
              <div key={index} className={styles['products__line']}>
                {lineWithProducts.map((product, index) => (
                  <Product
                    key={index}
                    {...product}
                    onView={this._handleFastView.bind(this, product)}
                    onCart={this._handleCart.bind(this, product)} />
                ))}
              </div>
            );
          })}
          {(items.length < count) && (
            <div className={styles['products__controls']}>
              <button className={styles['products__more']} type="button" onClick={this._handleLoadingMore.bind(this)}>Показать еще 12 из {count}</button>
            </div>
          )}
        </section>
        <Dialog title="Быстрый просмотр товара">
          <Form onCart={this._handleCart.bind(this)} />
        </Dialog>
      </section>
    );
  }
}

export default Component;
