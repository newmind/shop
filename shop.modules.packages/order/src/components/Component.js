
import { Button, Col, Container, Hr, Row, Breadcrumbs } from '@ui.packages/ui';
import numeral from '@packages/numeral';

import types from 'prop-types';
import React, {PureComponent} from 'react';

import OrderModify from './OrderModify';

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
    createOperation(formData);
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
          <Breadcrumbs
            items={[
              { title: 'Витрина', href: '/' },
              { title: `Оформление заказа` },
            ]}
          />
        </div>
        {hasProducts
          ? (
            <Container>
              <Row>
                <Col>
                  <OrderModify onSubmit={this._handleSendOrderData.bind(this)}/>
                </Col>
              </Row>
              <Hr/>
              <Row>
                <Col className={styles['controls']}>
                  <p className={styles['message']}>Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку Персональных данных.</p>
                  <Button mode="success" size="l" disabled={ ! isValid || inProcess} onClick={this._handleSubmitOrder.bind(this)}>
                    Оформить заказ на сумму {numeral(calculatedAmount).format()} руб.
                  </Button>
                </Col>
              </Row>
            </Container>
          )
          : (
            <div>Для оформления заказа необходимо выбрать товар</div>
          )}
      </section>
    );
  }
}

export default Component;
