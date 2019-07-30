
import React, { PureComponent } from 'react';

import Products from "./Products";
import Details from "./Details";

import { Row, Col } from "@ui.packages/ui";

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h2 className={styles['block__header']}>Выбранные товары</h2>
            <div className={styles['block__content']}>
              {/*<Products />*/}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className={styles['block__header']}>Оформление заказа</h2>
            <div className={styles['block__content']}>
              <Details />
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
