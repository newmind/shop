
import { restoreCartAction } from '@ui.packages/cart-widget';

import { useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';

import Icon from './Icon';
import Content from './Content';

import styles from './defaults.module.scss';

import { setStateAction } from '../ducks/slice';


function Widget() {
  if (/order/.test(location['pathname'])) {
    return null;
  }

  const dispatch = useDispatch();

  const [isFocus, setFocus] = useState(false);
  const [isInit, setInit] = useState(false);

  function handleMouseOver() {
    setFocus(true);
  }

  function handleMouseLeave() {
    setFocus(false);
  }

  useEffect(async function loadData() {
    if (isInit) {
      dispatch(setStateAction(isFocus));
    }
    else {
      dispatch(restoreCartAction());
      setInit(true);
    }
  }, [isFocus]);

  return (
    <div
      className={styles['wrapper']}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Icon />
      <Content />
    </div>
  );
}

export default Widget;
