
import React, { PureComponent } from 'react';

import { Container, Row, Col } from '@ui.packages/ui';

import Customer from './Customer';
import Delivery from './Delivery';
import Pay from './Pay';

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    return (
      <Container>
        <Row className={styles['block']}>
          <Col>
            <h2 className={styles['block__header']}>Покупатель</h2>
            <div className={styles['block__content']}>
              <div className={styles['information']}>
                <p className={styles['paragraph']}>Необходимо указать информацию о покупателе.</p>
              </div>
              <Customer />
            </div>
          </Col>
        </Row>
        <Row className={styles['block']}>
          <Col>
            <h2 className={styles['block__header']}>Доставка</h2>
            <div className={styles['block__content']}>
              <div className={styles['information']}>
                <p className={styles['paragraph']}>Необходимо выбрать способ доставки товара.</p>
              </div>
              <Delivery />
            </div>
          </Col>
        </Row>
        <Row className={styles['block']}>
          <Col>
            <h2 className={styles['block__header']}>Способ оплаты</h2>
            <div className={styles['block__content']}>
              <div className={styles['information']}>
                <p className={styles['paragraph']}>Необходимо выбрать способ оплаты.</p>
              </div>
              <Pay />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
