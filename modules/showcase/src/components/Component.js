
import { Dialog } from '@ui.packages/dialog';

import React from 'react';

import FastView from "./FastView";
import Filter from './Filter';
import Controls from "./Controls";
import Products from './Products';

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

      <Dialog name="fast-view-product">
        <FastView />
      </Dialog>
    </section>
  );
}

Showcase.propTypes = {};

Showcase.defaultProps = {};
