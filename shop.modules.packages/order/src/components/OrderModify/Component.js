
import { Row, Col } from "@ui.packages/kit";

import types from "prop-types";
import { FieldArray } from "redux-form";
import React, { lazy, Suspense } from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";


const Products = lazy(() => import(/* webpackChunkName: "order.products" */'./Products'));
const Details = lazy(() => import(/* webpackChunkName: "order.details" */'./Details'));
const Empty = lazy(() => import(/* webpackChunkName: "order.empty" */'./Empty'));


function OrderModify({ items, handleSubmit }) {
  const hasProducts = !! Object.keys(items).length;

  return (
    <form onSubmit={handleSubmit}>
      <Row className={styles['row']}>
        <Col>
          <h2 className={styles['block__header']}>Выбранные товары</h2>
          <div className={cn(styles['block__content'], styles['block__content--no-border'])}>
            <Suspense fallback={null}>
              {hasProducts
                ? <FieldArray name="items" component={Products} />
                : <Empty />}
            </Suspense>
          </div>
        </Col>
      </Row>
      <Row className={styles['row']}>
        <Col>
          <h2 className={styles['block__header']}>Оформление заказа</h2>
          <div className={styles['block__content']}>
            <Suspense fallback={null}>
              <Details />
            </Suspense>
          </div>
        </Col>
      </Row>
    </form>
  );
}

OrderModify.propTypes = {
  externalId: types.string,
  paymentLink: types.string,
};

export default OrderModify;
