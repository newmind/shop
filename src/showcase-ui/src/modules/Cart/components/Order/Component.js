
import React, { PureComponent } from 'react';

import Types from './Types';
import Recipe from './Recipe';
import Customer from './Customer';
import Delivery from './Delivery';
import Pay from './Pay';

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Тип очков</h2>
          <div className={styles['block__content']}>
            <Types />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Рецепт</h2>
          <div className={styles['block__content']}>
            <Recipe />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Покупатель</h2>
          <div className={styles['block__content']}>
            <Customer />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Доставка</h2>
          <div className={styles['block__content']}>
            <Delivery />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Способ оплаты</h2>
          <div className={styles['block__content']}>
            <Pay />
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__content']}>
            Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку Персональных данных.
            Я хочу быть в курсе новостей и акций по электронной почте
            Я хочу получать новости и акции в SMS-сообщениях
          </div>
        </div>
      </form>
    );
  }
}

export default Component;
