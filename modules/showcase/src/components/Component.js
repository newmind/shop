
import { Paging } from '@ui.packages/kit';
import { Dialog } from '@ui.packages/dialog';

import React from 'react';
import { useSelector } from 'react-redux';

import FastView from "./FastView";

import Empty from './Empty';
import Filter from './Filter';
import Products from './Products';

import styles from './default.module.scss';

import { selectMeta, selectInProcess } from '../ducks/slice';


export default function Showcase() {
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filters']}>
        <div className={styles['filters__content']}>
          <Filter />
        </div>
      </aside>
      <section className={styles['products']}>
        { !! meta['total']
        ? <Products />
        : <Empty />}
      </section>
      <div className={styles['controls']}>
        <Paging total={meta['total']} skip={12} disabled={inProcess} />
      </div>

      <Dialog name="fast-view-product">
        <FastView />
      </Dialog>
    </section>
  );
}

Showcase.propTypes = {};

Showcase.defaultProps = {};
