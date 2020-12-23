
import numeral from '@packages/numeral';

import { selectItems } from '@ui.packages/cart';
import { Button, Col, Container, Row, Breadcrumbs } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


import styles from './default.module.scss';


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


export default function Order({ submit, inProcess, isValid }) {
  const items = useSelector(selectItems);

  const calculatedAmount = calculateFullAmount(items);

  // function handleSendOrderData(formData) {
  //   createOperation({
  //     ...formData,
  //     amount: calculateFullAmount(formData['items']),
  //   });
  // }

  function handleSubmit() {
    submit('order');
  }

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
        { !! items.length
          ? (
            <Container>
              <Row>
                <Col>
                  {/*<OrderModify onSubmit={(data) => handleSendOrderData(data)} />*/}
                </Col>
              </Row>
              <Row>
                <Col className={styles['controls']}>
                  <p className={styles['message']}>Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку "Персональных данных".</p>
                  <Button mode="success" size="l" disabled={ ! isValid || inProcess} onClick={() => handleSubmit()}>
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
