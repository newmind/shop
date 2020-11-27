
import numeral from '@packages/numeral';
import { Button, Col, Container, Row, Breadcrumbs } from '@ui.packages/kit';

import types from 'prop-types';
import { Link } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import styles from './default.module.scss';

// document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;

const OrderModify = lazy(() => import(/* webpackChunkName: "order.order" */'./OrderModify'));


const calculateFullAmount = (products) => {
  let fullAmount = 0;
  for (let index in products) {
    if (products.hasOwnProperty(index)) {
      const product = products[index];
      fullAmount += product['amount'];
      if ('lens' in product) {
        const lens = product['lens'];
        for (let key in lens) {
          if (lens.hasOwnProperty(key)) {
            const position = lens[key];
            if (position) {
              fullAmount += position['coast'];
            }
          }
        }
      }
    }
  }
  return fullAmount;
};

function Order({ createOperation, submit, inProcess, products, hasProducts, isValid }) {
  function handleSendOrderData(formData) {
    console.log(formData)
    createOperation({
      ...formData,
      amount: calculateFullAmount(formData['items']),
    });
  }

  function handleSubmitOrder() {
    submit('order');
  }


  const calculatedAmount = calculateFullAmount(products['items']);

  return (
    <section className={styles['wrapper']}>
      <div className={styles['breadcrumbs']}>
        <div className={styles['breadcrumbs__content']}>
          <Breadcrumbs
            items={[
              { title: 'Витрина', href: '/products' },
              { title: `Оформление заказа` },
            ]}
          />
        </div>
      </div>
      <div className={styles['content']}>
        {hasProducts
          ? (
            <Container>
              <Row>
                <Col>
                  <Suspense fallback={null}>
                    <OrderModify onSubmit={() => handleSendOrderData()} />
                  </Suspense>
                </Col>
              </Row>
              <Row>
                <Col className={styles['controls']}>
                  <p className={styles['message']}>Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку "Персональных данных".</p>
                  <Button mode="success" size="l" disabled={ ! isValid || inProcess} onClick={() => handleSubmitOrder()}>
                    Оформить заказ на сумму {numeral(calculatedAmount).format()} руб.
                  </Button>
                </Col>
              </Row>
            </Container>
          )
          : (
            <div className={styles['empty']}>
              <p className={styles['empty__message']}>Нет выбранных товаров</p>
              <p className={styles['empty__description']}>Перейти в раздел <Link className={styles['link']} to="/products">Витрина</Link></p>
            </div>
          )}
      </div>
    </section>
  );
}

Order.propTypes = {
  products: types.object,
  isValid: types.bool,
  hasProducts: types.bool,
  inProcess: types.bool,
  submit: types.func,
  createOperation: types.func,
};

Order.defaultProps = {
  products: {},
  inProcess: false,
  hasProducts: false,
  isValid: false,
};

export default Order;
