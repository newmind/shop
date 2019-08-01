
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button, Container, Row, Col } from '@ui.packages/ui';

import OrderModify from './OrderModify';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
    isValid: types.bool,
    submit: types.func,
  };

  static defaultProps = {
    products: [],
  };

  _handleSendOrderData(formData) {
    const { createOperation } = this.props;
    createOperation(formData);
  }

  _handleSubmitOrder() {
    const { submit } = this.props;
    submit('order');
  }

  render() {
    const { products } = this.props;
    const productsCount = Object.keys(products).length;
    return !! productsCount
      ? (
        <Container className={styles['wrapper']}>
          <Row>
            <Col>
              <OrderModify onSubmit={this._handleSendOrderData.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this._handleSubmitOrder.bind(this)}>Оформить заказ</Button>
            </Col>
          </Row>
        </Container>
      )
     : (
       <div>Для оформления заказа необходимо выбрать товар</div>
     )
  }
}

export default Component;
