
import moment from '@packages/moment';
import numeral from '@packages/numeral';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    externalId: types.string,
    name: types.string,
    surname: types.string,
    address: types.string,
    delivery: types.string,
    amount: types.number,
    currency: types.object,
    createdAt: types.string,
  };

  static defaultProps = {
    externalId: '',
    name: '',
    surname: '',
    address: '',
    delivery: '',
    amount: 0.00,
    currency: {},
    createdAt: ''
  };

  render() {
    const { externalId, name, surname, address, delivery, amount, createdAt, currency } = this.props;

    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['header']}>Информация</h2>
        <div className={styles['content']}>
          <p className={styles['line']}>
            <span className={styles['line__label']}>Номер заказа:</span>
            <span className={styles['line__value']}>{ externalId }</span>
          </p>
          <p className={styles['line']}>
            <span className={styles['line__label']}>Получатель:</span>
            <span className={styles['line__value']}>{ surname } { name }</span>
          </p>
          {(delivery === 'post') && (
            <p className={styles['line']}>
              <span className={styles['line__label']}>Способ доставки:</span>
              <span className={styles['line__value']}>почтой</span>
            </p>
          )}
          {(delivery === 'courier') && (
            <p className={styles['line']}>
              <span className={styles['line__label']}>Способ доставки:</span>
              <span className={styles['line__value']}>курьером</span>
            </p>
          )}
          <p className={styles['line']}>
            <span className={styles['line__label']}>Адрес доставки:</span>
            <span className={styles['line__value']}>{ address }</span>
          </p>
          <p className={styles['line']}>
            <span className={styles['line__label']}>Дата оформления заказа:</span>
            <span className={styles['line__value']}>{ moment(createdAt).format('LLLL') }</span>
          </p>
          <p className={styles['line']}>
            <span className={styles['line__label']}>Сумма заказа:</span>
            <span className={styles['line__value']}>{ numeral(amount).format() } { currency['value'] }</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Component;
