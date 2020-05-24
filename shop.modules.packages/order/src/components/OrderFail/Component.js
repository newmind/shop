
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    externalId: types.string,
    paymentLink: types.string,
  };

  render() {
    return (
      <div className={styles['wrapper']}>
        <h3>Заказ успешно оформлен</h3>
        <p>В скором времени с вами свяжется нашь менеджер</p>
      </div>
    );
  }
}

export default Component;
