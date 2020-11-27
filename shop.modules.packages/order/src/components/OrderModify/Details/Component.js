
import { Container, Row, Col } from '@ui.packages/kit';

import React, { lazy, Suspense } from 'react';

import styles from "./default.module.scss";


const Pay = lazy(() => import(/* webpackChunkName: "order.recipe" */'./Pay'));
const Customer = lazy(() => import(/* webpackChunkName: "order.recipe" */'./Customer'));
const Delivery = lazy(() => import(/* webpackChunkName: "order.recipe" */'./Delivery'));


function Details() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

export default Details;
