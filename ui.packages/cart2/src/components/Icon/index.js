
import { selectUuid, selectIsOpen } from '@ui.packages/cart-widget';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from "./defaults.module.scss";


function Icon() {
  const navigate = useNavigate();

  const uuids = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);

  function handleGoToOrder() {
    if ( ! uuids.length) {
      return void 0;
    }
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return (
    <span className={cn(styles['wrapper'], { [styles['is-open']]: isOpen })} onClick={handleGoToOrder}>
      <span className={cn(styles['icon'], 'fas fa-shopping-cart')} />
      { !! uuids.length && (
        <span className={styles['has-inside']} />
      )}
    </span>
  );
}

export default Icon;
