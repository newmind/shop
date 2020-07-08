
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default () => {
  return (
    <section className={styles['container']}>
      <header className={styles['header']}>
        <h2>Контакты</h2>
      </header>
      <article className={styles['content']}>
        <div className={styles['block']}>
          <div className={styles['block__label']}>
            <span className={styles['label']}>
              <span className={cn(styles['label__icon'], 'fas fa-map-marker-alt')} />
              <span className={styles['label__caption']}>Адрес</span>
            </span>
          </div>
          <div className={styles['block__content']}>
            <p className={styles['paragraph']}>Россия, АР Крым, Бахчисарайский район, с. Угловое, ул. Комарова</p>
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__label']}>
            <span className={styles['label']}>
              <span className={cn(styles['label__icon'], 'fas fa-phone')} />
              <span className={styles['label__caption']}>Телефон</span>
            </span>
          </div>
          <div className={styles['block__content']}>
            <p className={styles['paragraph']}>+7 (999) 999-99-99</p>
            <p className={styles['paragraph']}>+7 (888) 888-88-88</p>
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__label']}>
            <span className={styles['label']}>
              <span className={cn(styles['label__icon'], 'far fa-envelope')} />
              <span className={styles['label__caption']}>E-Mail</span>
            </span>
          </div>
          <div className={styles['block__content']}>
            <p className={styles['paragraph']}>zemlya911@gmail.com</p>
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__label']}>
            <span className={styles['label']}>
              <span className={cn(styles['label__icon'], 'far fa-clock')} />
              <span className={styles['label__caption']}>Часы работы</span>
            </span>
          </div>
          <div className={styles['block__content']}>
            <p className={styles['paragraph']}>Заказы принимаются круглосуточно. Обработка заказов и консультации: с 9:00 до 18:00 по Московскому времени.</p>
          </div>
        </div>
      </article>
    </section>
  );
}
