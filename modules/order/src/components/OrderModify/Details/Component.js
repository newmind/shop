
import { Container, Row, Col, Header } from '@ui.packages/kit';

import React from 'react';

import Pay from './Pay';
import Customer from './Customer';
import Delivery from './Delivery';

import styles from "./default.module.scss";


function Details() {
  return (
    <Container>
      <Row className={styles['block']}>
        <Col>
          <Header level={3}>Покупатель</Header>
          <div className={styles['block__content']}>
            <Customer />
          </div>
        </Col>
      </Row>
      <Row className={styles['block']}>
        <Col>
          <Header level={3}>Доставка</Header>
          <div className={styles['block__content']}>
            <Delivery />
          </div>
        </Col>
      </Row>
      <Row className={styles['block']}>
        <Col>
          <Header level={3}>Способ оплаты</Header>
          <div className={styles['block__content']}>
            <Pay />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Details;
