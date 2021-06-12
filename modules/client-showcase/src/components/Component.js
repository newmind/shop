
import { selectInProcess } from '@modules/client-showcase';

import { Dialog } from '@ui.packages/dialog';

import React from 'react';
import { useSelector } from 'react-redux';

import Filter from './Filter';
import Spinner from './Spinner';
import Controls from "./Controls";
import Products from './Products';
import ProductOptionsForm from "./ProductOptionsForm";

import styles from './default.module.scss';


export default function Showcase() {
  const inProcess = useSelector(selectInProcess);

  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filter']}>
        <Filter />
      </aside>
      <section className={styles['content']}>
        <div className={styles['controls']}>
          <Controls />
        </div>
        {inProcess
          ? <Spinner/>
          : <Products />
        }
      </section>

      <Dialog name="fast-view">
        <ProductOptionsForm />
      </Dialog>
    </section>
  );
}

Showcase.propTypes = {};

Showcase.defaultProps = {};
