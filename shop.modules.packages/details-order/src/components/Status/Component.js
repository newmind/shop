
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    status: types.object,
    delivery: types.string,
  };

  static defaultProps = {
    status: null,
    delivery: null,
  };

  render() {
    const { status, delivery } = this.props;

    const stepsClassName = cn(styles['steps'], {
      [styles['steps--pay']]: (status === 1),
      [styles['steps--formed']]: (status === 2),
      [styles['steps--courier']]: (status === 3),
      [styles['steps--delivered']]: (status === 4),
      [styles['steps--finished']]: (status === 5),
    });

    return (
      <div className={styles['status']}>
        <h2 className={styles['header']}>Статус заказа</h2>
        <div className={stepsClassName}>
          <div className={styles['steps__item']}>
            <span className={styles['pay']}>{(status < 1) ? 'Не оплачен' : 'Оплачен'}</span>
          </div>
          <div className={styles['steps__item']}>
            <span className={styles['formed']}>{(status < 2) ? 'Не сформирован' : 'Сформирован'}</span>
          </div>
          <div className={styles['steps__item']}>
            <span className={styles['courier']}>
              {(delivery === 'post') && 'Отправлен'}
              {(delivery === 'courier') && 'Передан курьеру'}
            </span>
          </div>
          {(delivery === 'post') && (
            <div className={styles['steps__item']}>
              <span className={styles['delivered']}>Доставлен</span>
            </div>
          )}
          <div className={styles['steps__item']}>
            <span className={styles['finished']}>Выполнен</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
