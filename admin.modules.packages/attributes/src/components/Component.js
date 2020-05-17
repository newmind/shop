
import { Tabs, Tab, TabContainer } from '@ui.packages/tabs';

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
    return (
      <section className={styles['wrapper']}>
        <div className={styles['header']}>
          <h2>Аттрибуты</h2>
        </div>
        <Tabs defaultTab="types">
          <div className={styles['controls']}>
            <Tab caption="Тип" name="types" />
            <Tab caption="Категория" name="categories" />
            <Tab caption="Цвет" name="colors" />
            <Tab caption="Материал" name="materials" />
            <Tab caption="Форма" name="forms" />
            <Tab caption="Единицы измерения" name="units" />
            <Tab caption="Валюта" name="currencies" />
          </div>
          <div className={styles['content']}>
            <TabContainer to="types">
              <article className={styles['block__content']}>
                <Types />
              </article>
            </TabContainer>
            <TabContainer to="categories">
              <article className={styles['block__content']}>
                <Categories />
              </article>
            </TabContainer>
            <TabContainer to="colors">
              <article className={styles['block__content']}>
                <Colors />
              </article>
            </TabContainer>
            <TabContainer to="materials">
              <article className={styles['block__content']}>
                <Materials />
              </article>
            </TabContainer>
            <TabContainer to="forms">
              <article className={styles['block__content']}>
                <Forms />
              </article>
            </TabContainer>
            <TabContainer to="units">
              <article className={styles['block__content']}>
                <Units />
              </article>
            </TabContainer>
            <TabContainer to="currencies">
              <article className={styles['block__content']}>
                <Currencies />
              </article>
            </TabContainer>
          </div>
        </Tabs>
      </section>
    );
  }
}

export default Component;
