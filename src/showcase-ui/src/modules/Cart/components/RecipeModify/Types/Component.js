
import React, { PureComponent } from 'react';

import { Row, Col } from '@ui.packages/ui';
import { Tabs, Tab, TabContainer } from '@ui.packages/tabs';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static defaultProps = {
    values: {},
  };

  _handleChangeTab() {
    const { onChange } = this.props;
    onChange('recipe', 'type', null);
  }

  _handleSelectType(type) {
    const { onChange } = this.props;
    onChange('recipe', 'type', type);
  }

  render() {
    const { values: { type = -1 }} = this.props;
    return (
      <Tabs name="type" defaultTab="simple" onChange={this._handleChangeTab.bind(this)}>
        <div className={styles['tabs']}>
          <Tab name="simple" caption="Оправа или очки без рецепта" />
          <Tab name="eye-glasses" caption="Очки для зрения" />
          <Tab name="progressive" caption="Прогрессивы" />
          <Tab name="bifocal" caption="Бифокалы" />
          <Tab name="digress" caption="Дегрессивы" />
        </div>
        <div className={styles['content']}>
          <TabContainer to="simple">
            <Row>
              <Row>
                <Col>
                  <div className={cn(styles['card'], {[styles['card--active']]: type === 1})} onClick={this._handleSelectType.bind(this, 1)}>
                    <h3 className={styles['card__header']}>Только оправа</h3>
                    <p className={styles['card__description']}>Оправа поставляется с пластиковыми демо-линзами от производителя</p>
                  </div>
                </Col>
                <Col>
                  <div className={cn(styles['card'], {[styles['card--active']]: type === 2})} onClick={this._handleSelectType.bind(this, 2)}>
                    <h3 className={styles['card__header']}>Имиджевые линзы</h3>
                    <p className={styles['card__description']}>Оправа для создания имиджа, работы с компьютером - оптические линзы без рецепта</p>
                  </div>
                </Col>
              </Row>
            </Row>
          </TabContainer>
          <TabContainer to="eye-glasses">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 3})} onClick={this._handleSelectType.bind(this, 3)}>
                  <h3 className={styles['card__header']}>Для дали</h3>
                  <p className={styles['card__description']}>Линзы для улучшения видимости на расстоянии</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 4})} onClick={this._handleSelectType.bind(this, 4)}>
                  <h3 className={styles['card__header']}>Для чтения</h3>
                  <p className={styles['card__description']}>Линзы для чтения и работы на близком расстоянии</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 5})} onClick={this._handleSelectType.bind(this, 5)}>
                  <h3 className={styles['card__header']}>Для средней дистанции</h3>
                  <p className={styles['card__description']}>Линзы для работы на средней дистанции - например, за компьютером или чтением книг</p>
                </div>
              </Col>
            </Row>
          </TabContainer>
          <TabContainer to="progressive">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 6})} onClick={this._handleSelectType.bind(this, 6)}>
                  <h3 className={styles['card__header']}>Standard</h3>
                  <p className={styles['card__description']}>Линзы корректирующие три вида зрения- вдаль, вблизь и на среднее расстояние</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 7})} onClick={this._handleSelectType.bind(this, 7)}>
                  <h3 className={styles['card__header']}>Premium</h3>
                  <p className={styles['card__description']}>Линзы с неровной поверхностью для расширения зон видения</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 8})} onClick={this._handleSelectType.bind(this, 8)}>
                  <h3 className={styles['card__header']}>Elite</h3>
                  <p className={styles['card__description']}>Компьютерное нивелирование боковых аберраций</p>
                </div>
              </Col>
            </Row>
          </TabContainer>
          <TabContainer to="bifocal">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 9})} onClick={this._handleSelectType.bind(this, 9)}>
                  <h3 className={styles['card__header']}>R28</h3>
                  <p className={styles['card__description']}>Округлый сегмент в зоне чтения. Для рецептов с положительными диоптриями.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 10})} onClick={this._handleSelectType.bind(this, 10)}>
                  <h3 className={styles['card__header']}>D28</h3>
                  <p className={styles['card__description']}>Наиболее популярные с D-образным сегментом 28мм в зоне чтения.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 11})} onClick={this._handleSelectType.bind(this, 11)}>
                  <h3 className={styles['card__header']}>D35</h3>
                  <p className={styles['card__description']}>Большой D-образный сегмент 35мм в зоне чтения.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 12})} onClick={this._handleSelectType.bind(this, 12)}>
                  <h3 className={styles['card__header']}>C28</h3>
                  <p className={styles['card__description']}>Сглаженная линия перехода сегмента для чтения в верхней части.</p>
                </div>
              </Col>
            </Row>
          </TabContainer>
          <TabContainer to="digress">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 13})} onClick={this._handleSelectType.bind(this, 13)}>
                  <h3 className={styles['card__header']}>Дегрессивные линзы</h3>
                  <p className={styles['card__description']}>Линзы для работы на близких и средних расстояниях.</p>
                </div>
              </Col>
            </Row>
          </TabContainer>
        </div>
      </Tabs>
    );
  }
}

export default Component;