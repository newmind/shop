
import React, { PureComponent } from 'react';

import { Col, Row, Table } from "@packages/ui";


class Component extends PureComponent {
  render() {
    const { products } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Table
              items={products}
              columns={[
                {
                  title: 'Номер',
                },
                {
                  title: 'Детали',
                },
                {
                  title: 'Способ оплаты',
                },
                {
                  title: 'Сумма',
                },
                {
                  title: 'Статус',
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;
