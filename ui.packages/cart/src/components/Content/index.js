
import { createCancelToken } from '@ui.packages/request';
import {
  closeCartAction,

  selectUuid,
  selectIsOpen,
  selectInProcess,

  getCart,
} from '@ui.packages/cart-widget';

import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';

import List from './List';
import Spinner from './Spinner';

import styles from './defaults.module.scss';


function Content() {
  const dispatch = useDispatch();

  const [isInit, setInit] = useState(false);

  const wrapperRef = useRef(null);
  const uuids = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);
  const inProcess = useSelector(selectInProcess);


  useEffect(function() {
    function handleClose(event) {
      const { current: wrapperElement } = wrapperRef;
      const target = event['target'];
      if (wrapperElement && target) {
        if ( ! wrapperElement.contains(target)) {
          dispatch(closeCartAction());
        }
      }
    }
    document.querySelector('#scroller').addEventListener('scroll', handleClose)
    document.addEventListener('click', handleClose);
    return () => {
      document.querySelector('#scroller').removeEventListener('scroll', handleClose);
      document.removeEventListener('click', handleClose);
    };
  }, []);

  useEffect(function() {
    const token = createCancelToken();
    (async () => {
      await dispatch(getCart(uuids, token));
      setInit(true);
    })();

    return () => {
      token.cancel();
      setInit(false);
    };
  }, [isOpen]);

  useEffect(function() {
    if (isInit) {
      const token = createCancelToken();
      dispatch(getCart(uuids, token));
      return () => {
        token.cancel();
      };
    }
  }, [uuids]);

  return (
    <div ref={wrapperRef} className={styles['wrapper']}>
      <div className={styles['content']}>
        {( ! isInit && inProcess)
          ? <Spinner />
          : <List />}
      </div>
    </div>
  );
}

export default Content;
