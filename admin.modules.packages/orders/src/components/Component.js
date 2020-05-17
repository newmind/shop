
import { Col, Row } from "@ui.packages/kit";

import React, { PureComponent } from 'react';

import Table from './Table';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <h2>Заказы</h2>
        </div>
        <Row>
          <Col>
            <Table />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;
