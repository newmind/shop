
import { Dialog } from '@ui.packages/dialog';
import { objectToQuery, queryToObject } from '@ui.packages/utils';

import types from 'prop-types';
import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


const Filter = lazy(() => import(/* webpackChunkName: "showcase.filter" */'./Filter'));
const Products = lazy(() => import(/* webpackChunkName: "showcase.products" */'./Products'));
const Paging = lazy(() => import(/* webpackChunkName: "showcase.paging" */'./Paging'));
const FastView = lazy(() => import(/* webpackChunkName: "showcase.paging" */'./FastView'));


function Showcase({ getProducts }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(function init() {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Выбор очков, оправ и аксесуаров');

    const query = queryToObject(location['search']);

    getProducts(query);
  }, []);

  function handleFilter({ amount, ...formData }) {
    formData['page'] = 1;
    formData['minAmount'] = amount[0];
    formData['maxAmount'] = amount[1];

    navigate('?' + objectToQuery(formData));
    getProducts(formData);
  }

  function handleLoadingMore(page) {
    const query = new URLSearchParams(location['search']);

    if (page > 1) {
      query.set('page', String(page));
    }
    else {
      query.delete('page');
    }

    getProducts({ search: query.toString() });
  }

  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filters']}>
        <div className={styles['filters__content']}>
          <Suspense fallback={null}>
            <Filter onSubmit={handleFilter} />
          </Suspense>
        </div>
      </aside>
      <section className={styles['products']}>
        <Suspense fallback={null}>
          <Products />
        </Suspense>
      </section>
      <div className={styles['controls']}>
        <Suspense fallback={null}>
          <Paging onChange={handleLoadingMore} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Dialog name="fast-view-product" title="Быстрый просмотр">
          <FastView />
        </Dialog>
      </Suspense>
    </section>
  );
}

Showcase.propTypes = {
  addProductToCart: types.func,
};

Showcase.defaultProps = {};

export default Showcase;
