
import moment from '@ui.packages/moment';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {

  };

  static defaultProps = {

  };

  render() {
    console.log(this.props);
    const { name, surname, address, delivery, createdAt } = this.props;

    return (
      <div className={styles['information']}>
        <h2 className={styles['header']}>Получатель</h2>
        <div className={styles['content']}>
          <p className={styles['line']}>Получатель: {surname} {name}</p>
          <p className={styles['line']}>Адрес доставки: {address}</p>
          <p className={styles['line']}>Способ доставки: {delivery}</p>
          <p className={styles['line']}>Дата оформления заказа: {moment(createdAt).format('DD.MM.YYYY')}</p>
        </div>
      </div>
    );
  }
}

export default Component;
