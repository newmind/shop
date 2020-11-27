
import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function OrderFail() {
  return (
    <div className={styles['wrapper']}>
      <h3>Заказ успешно оформлен</h3>
      <p>В скором времени с вами свяжется нашь менеджер</p>
    </div>
  );
}

OrderFail.propTypes = {
  externalId: types.string,
  paymentLink: types.string,
}

export default OrderFail;
