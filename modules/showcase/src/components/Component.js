
import { Dialog } from '@ui.packages/dialog';

import React from 'react';
import types from 'prop-types';

import FastView from "./FastView";

import Filter from './Filter';
import Products from './Products';
import Paging from "./Paging";

import styles from './default.module.scss';


export default function Showcase() {
  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filters']}>
        <div className={styles['filters__content']}>
          <Filter />
        </div>
      </aside>
      <section className={styles['products']}>
        <Products />
      </section>
      <div className={styles['controls']}>
        <Paging />
      </div>

      <Dialog name="fast-view-product" title="Быстрый просмотр">
        <FastView />
      </Dialog>
    </section>
  );
}

Showcase.propTypes = {
  addProductToCart: types.func,
};

Showcase.defaultProps = {};
