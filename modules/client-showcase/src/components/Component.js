
import { Dialog } from '@ui.packages/dialog';

import React from 'react';

import Filter from './Filter';
import Controls from "./Controls";
import Products from './Products';
import ProductOptionsForm from "./ProductOptionsForm";

import styles from './default.module.scss';


export default function Showcase() {
  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filter']}>
        <Filter />
      </aside>
      <section className={styles['content']}>
        <div className={styles['controls']}>
          <Controls />
        </div>
        <Products />
      </section>

      <Dialog name="fast-view">
        <ProductOptionsForm />
      </Dialog>
    </section>
  );
}

Showcase.propTypes = {};

Showcase.defaultProps = {};
