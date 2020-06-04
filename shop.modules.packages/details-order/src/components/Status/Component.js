
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'OrderStatus';

  static propTypes = {
    status: types.object,
  };

  static defaultProps = {
    status: null,
  };

  render() {
    const { status } = this.props;

    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['header']}>Статус заказа</h2>
        <div className={styles['content']}>
          { (status && status['code'] === 1) && <p className={styles['message']}>Заказ не оплачен</p> }
          { (status && status['code'] === 2) && <p className={styles['message']}>Заказ оплачен</p> }
          { (status && status['code'] === 10) && <p className={styles['message']}>Заказ подтвержден менеджером</p> }
          { (status && status['code'] === 20) && <p className={styles['message']}>Заказ сформирован</p> }
          { (status && status['code'] === 30) && <p className={styles['message']}>Отправлен по почте</p> }
          { (status && status['code'] === 31) && <p className={styles['message']}>Передан в курьерскую службу доставки</p> }
          { (status && status['code'] === 40) && <p className={styles['message']}>Заказ выполнен</p> }
          { (status && status['code'] === 50) && <p className={styles['message']}>Заказ онулирован</p> }
        </div>
      </div>
    );
  }
}

export default Component;
