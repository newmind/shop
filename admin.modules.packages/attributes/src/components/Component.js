
// import types from 'prop-types';
import React, { PureComponent } from 'react';

import Types from './Types';
import Forms from './Forms';
import Units from './Units';
import Colors from './Colors';
import Materials from './Materials';
import Categories from './Categories';
import Currencies from './Currencies';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const {} = this.props;

    return (
      <section className={styles['wrapper']}>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Тип</h3>
          <article className={styles['block__content']}>
            <Types />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Категория</h3>
          <article className={styles['block__content']}>
            <Categories />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Цвет</h3>
          <article className={styles['block__content']}>
            <Colors />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Материал</h3>
          <article className={styles['block__content']}>
            <Materials />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Форма</h3>
          <article className={styles['block__content']}>
            <Forms />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Единицы измерения</h3>
          <article className={styles['block__content']}>
            <Units />
          </article>
        </section>
        <section className={styles['block']}>
          <h3 className={styles['block__header']}>Валюта</h3>
          <article className={styles['block__content']}>
            <Currencies />
          </article>
        </section>
      </section>
    );
  }
}

export default Component;
