
import React from 'react';

import styles from './default.module.scss';
import cn from "classnames";


function Delivery() {
  return (
    <section className={styles['container']}>
      <header className={styles['header']}>
        <h2>Доставка</h2>
      </header>
      <article className={styles['content']}>
        <div className={styles['block']}>
          <div className={styles['block__col']}>
            <div className={styles['pay']}>
              <span className={cn(styles['pay__icon'], 'fas fa-mail-bulk')} />
              <p className={styles['pay__label']}>Почтой России</p>
              <p className={styles['pay__description']}>Возможность произвести оплату при получении товара. Оплата производится наличными или банковской картой</p>
            </div>
          </div>
          <div className={styles['block__col']}>
            <div className={styles['pay']}>
              <span className={cn(styles['pay__icon'], 'fas fa-shipping-fast')} />
              <p className={styles['pay__label']}>Курьерская доставка по городу Москва</p>
              <p className={styles['pay__description']}>Оплата онлайн производится до оформления и принятия заказа в работу. Оплата производится только банковской картой</p>
            </div>
          </div>
          <div className={styles['block__col']}>
            <div className={styles['pay']}>
              <span className={cn(styles['pay__icon'], 'fas fa-box')} />
              <p className={styles['pay__label']}>Курьерская доставка по CDEK</p>
              <p className={styles['pay__description']}>Оплата онлайн производится до оформления и принятия заказа в работу. Оплата производится только банковской картой</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Delivery;
