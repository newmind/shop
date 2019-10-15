
import React, { PureComponent } from 'react';
import { FieldArray } from "redux-form";

import Products from "./Products";
import Details from "./Details";
import Empty from "./Empty";

import { Row, Col } from "@ui.packages/ui";

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { items, handleSubmit } = this.props;
    const hasProducts = !! Object.keys(items).length;

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h2 className={styles['block__header']}>Выбранные товары</h2>
            <div className={styles['block__content']}>
              {hasProducts
                ? <FieldArray name="items" component={Products} />
                : <Empty />
              }
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
