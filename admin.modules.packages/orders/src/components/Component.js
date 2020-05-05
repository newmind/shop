
import { Col, Row } from "@ui.packages/ui";
import { Table, Column } from '@ui.packages/table';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;

    return (
      <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <h2>Заказы</h2>
        </div>
        <Row>
          <Col>
            <Table columns={items}>
              <Column
                title="Номер"
                align="externalId"
              />
              <Column
                title="Детали"
                alias="details"
              />
              <Column
                title="Способ оплаты"
                alias="paymentMethod"
              />
              <Column
                title="Сумма"
                alias="amount"
              />
              <Column
                title="Статус"
                alias="status"
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;
