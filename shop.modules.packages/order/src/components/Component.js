import types from 'prop-types';
import React, {PureComponent} from 'react';

import { Button, Col, Container, Hr, Row, Breadcrumbs } from '@ui.packages/ui';

import OrderModify from './OrderModify';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
    isValid: types.bool,
    submit: types.func,
    createOperation: types.func,
  };

  static defaultProps = {
    products: [],
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
    const {products, isValid} = this.props;
    const hasProducts = !! Object.keys(products).length;
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
                  <Button mode="success" size="l" disabled={ ! isValid} onClick={this._handleSubmitOrder.bind(this)}>Оформить заказ</Button>
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
