
import numeral from '@packages/numeral';
import { Dialog } from '@ui.packages/dialog';
import { Button, Col, Container, Row, Breadcrumbs } from '@ui.packages/ui';

import types from 'prop-types';
import { Link } from "react-router-dom";
import React, { PureComponent } from 'react';

import OrderModify from './OrderModify';
import OrderSuccess from './OrderSuccess';

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

class Component extends PureComponent {
  static propTypes = {
    products: types.object,
    isValid: types.bool,
    hasProducts: types.bool,
    inProcess: types.bool,
    submit: types.func,
    createOperation: types.func,
  };

  static defaultProps = {
    products: {},
    inProcess: false,
    hasProducts: false,
    isValid: false,
  };

  _handleSendOrderData(formData) {
    const {createOperation} = this.props;

    createOperation({
      ...formData,
      amount: calculateFullAmount(formData['items']),
    });
  }

  _handleSubmitOrder() {
    const {submit} = this.props;
    submit('order');
  }

  render() {
    const { inProcess, products, hasProducts, isValid } = this.props;

    const calculatedAmount = calculateFullAmount(products['items']);

    return (
      <section className={styles['wrapper']}>
        <div className={styles['breadcrumbs']}>
          <div className={styles['breadcrumbs__content']}>
            <Breadcrumbs
              items={[
                { title: 'Витрина', href: '/' },
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
                    <OrderModify onSubmit={this._handleSendOrderData.bind(this)}/>
                  </Col>
                </Row>
                <Row>
                  <Col className={styles['controls']}>
                    <p className={styles['message']}>Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку "Персональных данных".</p>
                    <Button mode="success" size="l" disabled={ ! isValid || inProcess} onClick={this._handleSubmitOrder.bind(this)}>
                      Оформить заказ на сумму {numeral(calculatedAmount).format()} руб.
                    </Button>
                  </Col>
                </Row>
              </Container>
            )
            : (
              <div className={styles['empty']}>
                <p className={styles['empty__message']}>Нет выбранных товаров</p>
                <p className={styles['empty__description']}>Перейти в раздел <Link className={styles['link']} to="/">Витрина</Link></p>
              </div>
            )}
        </div>
        <Dialog name="success">
          <OrderSuccess />
        </Dialog>
      </section>
    );
  }
}

export default Component;
