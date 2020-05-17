
import { Container, Row, Col } from '@ui.packages/kit';

import React, { PureComponent } from 'react';

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
              <Customer />
            </div>
          </Col>
        </Row>
        <Row className={styles['block']}>
          <Col>
            <h2 className={styles['block__header']}>Доставка</h2>
            <div className={styles['block__content']}>
              <Delivery />
            </div>
          </Col>
        </Row>
        <Row className={styles['block']}>
          <Col>
            <h2 className={styles['block__header']}>Способ оплаты</h2>
            <div className={styles['block__content']}>
              <Pay />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
