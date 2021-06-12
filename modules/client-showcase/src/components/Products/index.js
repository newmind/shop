
import { selectItems, selectMeta, selectInProcess } from '@modules/client-showcase';

import { Paging } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import Empty from './Empty';
import Product from './Product';

import styles from "./default.module.scss";


function Products() {
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        { ! meta['total'] && (
          <Empty />
        )}
        {items.map((product) => (
          <div className={styles['section']} key={product['uuid']}>
            <Product {...product} />
          </div>
        ))}
      </div>
      {(meta['total'] > 12) && (
        <div className={styles['paging']}>
          <Paging total={meta['total']} skip={12} disabled={inProcess} />
        </div>
      )}
    </div>
  );
}

export default Products;
