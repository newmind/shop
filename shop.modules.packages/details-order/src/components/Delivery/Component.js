
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    delivery: types.string,
  };

  static defaultProps = {
    delivery: '',
  };

  render() {
    const { delivery } = this.props;

    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['header']}>Способ доставки</h2>
        <div className={styles['content']}>
          { (delivery === 'post') && <p className={styles['message']}>Заказ будет доставлен по почте</p> }
          { (delivery === 'courier') && <p className={styles['message']}>Заказ будет доставлен курьерской службой</p> }
        </div>
      </div>
    );
  }
}

export default Component;
