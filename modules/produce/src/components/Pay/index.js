
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Pay() {
  return (
    <section className={styles['container']}>
      <header className={styles['header']}>
        <h2>Оплата</h2>
      </header>
      <article className={styles['content']}>
        <div className={styles['block']}>
          <div className={styles['block__col']}>
            <div className={styles['pay']}>
              <span className={cn(styles['pay__icon'], 'fas fa-wallet')} />
              <p className={styles['pay__label']}>Наличными при получении</p>
              <p className={styles['pay__description']}>Возможность произвести оплату при получении товара. Оплата производится наличными или банковской картой</p>
            </div>
          </div>
          <div className={styles['block__col']}>
            <div className={styles['pay']}>
              <span className={cn(styles['pay__icon'], 'far fa-credit-card')} />
              <p className={styles['pay__label']}>Онлайн оплата</p>
              <p className={styles['pay__description']}>Оплата онлайн производится до оформления и принятия заказа в работу. Оплата производится только банковской картой</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Pay;
