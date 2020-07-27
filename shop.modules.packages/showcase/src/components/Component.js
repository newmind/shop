
import { objectToQuery } from '@ui.packages/utils';
import { Dialog } from '@ui.packages/dialog';

import types from 'prop-types';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Filter = lazy(() => import(/* webpackChunkName: "showcase.filter" */'./Filter'));
const Products = lazy(() => import(/* webpackChunkName: "showcase.products" */'./Products'));
const Paging = lazy(() => import(/* webpackChunkName: "showcase.paging" */'./Paging'));
const FastView = lazy(() => import(/* webpackChunkName: "showcase.paging" */'./FastView'));


class Component extends PureComponent {
  static propTypes = {
    addProductToCart: types.func,
  };

  static defaultProps = {};

  _handleFilter(formData) {
    const { pushSearch } = this.props;

    formData['page'] = 1;
    pushSearch({ search: objectToQuery(formData) });
  }

  _handleCart(product) {
    const { addProductToCart } = this.props;

    addProductToCart(product);
  }

  _handleLoadingMore(page) {
    const { location: { search }, pushSearch} = this.props;
    const query = new URLSearchParams(search);

    if (page > 1) {
      query.set('page', String(page));
    }
    else {
      query.delete('page');
    }

    pushSearch({ search: query.toString() });
  }

  render() {
    return (
      <section className={styles['wrapper']}>
        <aside className={styles['filters']}>
          <div className={styles['filters__content']}>
            <Suspense fallback={null}>
              <Filter onSubmit={this._handleFilter.bind(this)} />
            </Suspense>
          </div>
        </aside>
        <section className={styles['products']}>
          <Suspense fallback={null}>
            <Products onAddToCart={this._handleCart.bind(this)} />
          </Suspense>
        </section>
        <div className={styles['controls']}>
          <Suspense fallback={null}>
            <Paging onChange={this._handleLoadingMore.bind(this)} />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <Dialog name="fast-view-product">
            <FastView />
          </Dialog>
        </Suspense>
      </section>
    );
  }
}

export default Component;
