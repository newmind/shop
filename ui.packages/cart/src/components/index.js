
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './Icon';
import List from './List';
import Empty from './Empty';

import { closeCart, restoreCart, selectItems, selectIsOpen } from '../ducks/cartSlice';

import styles from './defaults.module.scss';


function Cart() {
  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const isOpen = useSelector(selectIsOpen);
  const cartRef = useRef(null);

  useEffect(function init() {
    function onClick(event) {
      const target = event.target;
      const { current: cartElement } = cartRef;

      if (cartElement && target && ! cartElement.contains(target)) {
        isOpen && dispatch(closeCart());
      }
    }
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  });

  useEffect(function restoreState() {
    dispatch(restoreCart());
  }, []);

  if (/order/.test(location['pathname'])) {
    return null;
  }

  const hasProductsInCart = !! items.length;

  return (
    <div ref={cartRef} className={styles['cart']}>
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
