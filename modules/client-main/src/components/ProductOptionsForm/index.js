
import { useMount, useUnmount } from '@ui.packages/hoc';
import { getProduct, resetProductAction, selectProduct, selectInProcess } from '@modules/client-main';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from "./Product";
import Spinner from "./Spinner";

import styles from './default.module.scss';


export default function ProductOptionsForm({ data }) {
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);
  const inProcess = useSelector(selectInProcess);

  useMount(async () => {
    dispatch(getProduct(data['uuid']));
  });

  useUnmount(() => {
    dispatch(resetProductAction());
  });

  return (
    <div className={styles['wrapper']}>
      {(inProcess || ! product)
        ? <Spinner />
        : <Product />}
    </div>
  );
}
