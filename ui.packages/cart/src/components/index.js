
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './Icon';
import List from './List';
import Empty from './Empty';


import styles from './defaults.module.scss';

import { getAmount, getProducts } from "../ducks/commands";
import {
  closeCartAction,
  openCartAction,

  restoreCartAction,

  selectUuid,
  selectIsOpen,
} from '../ducks/slice';

function Cart() {
  const location = useLocation();
  const dispatch = useDispatch();
  const uuid = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);

  const cartRef = useRef(null);


  useEffect(function init() {
    function onClick(event) {
      const target = event.target;
      const { current: cartElement } = cartRef;

      if (cartElement && target && ! cartElement.contains(target)) {
        isOpen && dispatch(closeCartAction());
      }
    }
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  });

  useEffect(function restoreState() {
    dispatch(restoreCartAction());
  }, []);

  useEffect(async function restoreState() {
    if (isOpen) {
      if ( !! uuid.length) {
        const items = uuid.map(item => item[0]);
        await dispatch(getProducts(items));
        await dispatch(getAmount(uuid));
      }
    }
  }, [isOpen, uuid]);

  if (/order/.test(location['pathname'])) {
    return null;
  }

  async function handleSwitchStateCaretList() {
    if (isOpen) {
      dispatch(closeCartAction());
    }
    else {
      dispatch(openCartAction());
    }
  }

  const hasProductsInCart = !! uuid.length;

  return (
    <div ref={cartRef} className={styles['cart']}  onMouseEnter={() => handleSwitchStateCaretList()} onMouseLeave={() => handleSwitchStateCaretList()}>
      <Icon />
      {isOpen && (
        <div className={styles['wrapper']}>
          <div className={styles['container']}>
            {hasProductsInCart
              ? <List />
              : <Empty />}
          </div>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {};

Cart.defaultProps = {};

export default Cart;
