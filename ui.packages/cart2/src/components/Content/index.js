
import { createCancelToken } from '@ui.packages/request';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from './List';
import Empty from './Empty';
import Spinner from './Spinner';

import {
  selectUuid,
  selectIsOpen,
  selectInAmountProcess,
  selectInProductProcess,
} from '../../ducks/slice';

import { getAmount, getProducts } from '../../ducks/commands';

import styles from './defaults.module.scss';


function Content() {
  const dispatch = useDispatch();

  const uuids = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);
  const inGetAmountProcess = useSelector(selectInAmountProcess);
  const inGetProductsProcess = useSelector(selectInProductProcess);

  const [isInit, setInit] = useState(false);

  useEffect(function() {
    if ( ! uuids.length) {
      return void 0;
    }

    const amountsToken = createCancelToken();
    const productsToken = createCancelToken();

    if (isInit && isOpen) {
      dispatch(getAmount(uuids, amountsToken));
      dispatch(getProducts(uuids, productsToken));
    }
    else {
      setInit(true);
    }
    return () => {
      if (isInit && isOpen) {
        amountsToken.cancel();
        productsToken.cancel();
      }
    }
  }, [isOpen]);

  return isOpen && (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        { ! uuids.length
          ? <Empty />
          : (inGetAmountProcess || inGetProductsProcess)
            ? <Spinner />
            : <List />}
      </div>
    </div>
  );
}

export default Content;
