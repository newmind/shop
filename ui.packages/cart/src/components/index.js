
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './Icon';
import List from './List';
import Empty from './Empty';

import styles from './defaults.module.scss';

import { getAmount, getProducts } from "../ducks/commands";
import {
  resetStateAction,

  restoreCartAction,

  closeCartAction,
  openCartAction,

  selectUuid,
  selectIsOpen,
} from '../ducks/slice';

function Cart() {
  const location = useLocation();
  const dispatch = useDispatch();

  const uuid = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);

  const cartRef = useRef(null);
  const hasProductsInCart = !! uuid.length;


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
  }, []);

  useEffect(function restoreState() {
    dispatch(restoreCartAction());
  }, []);

  useEffect(function() {
    if (isOpen) {
      if ( !! uuid.length) {
        const items = uuid.map(item => item[0]);

        dispatch(getProducts(items));
      }
    }
  }, [isOpen]);

  useEffect(function() {
    if (isOpen) {
      if ( !! uuid.length) {
        dispatch(getAmount(uuid));
      }
    }
  }, [isOpen, uuid]);


  if (/order/.test(location['pathname'])) {
    return null;
  }

  async function handleSwitchStateCaretList() {
    if (isOpen) {
      dispatch(closeCartAction());
      dispatch(resetStateAction());
    }
    else {
      dispatch(openCartAction());
    }
  }

  return (
    <div ref={cartRef} className={styles['cart']}  onMouseEnter={() => handleSwitchStateCaretList()} onMouseLeave={() => handleSwitchStateCaretList()}>
      <Icon />
      {isOpen && (
        <div className={styles['wrapper']}>
          <div className={styles['container']}>
            {hasProductsInCart
              ? <List />
              : <Empty />
            }
          </div>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {};

Cart.defaultProps = {};

export default Cart;
