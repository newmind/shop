
import { Col, Row, Table } from "@ui.packages/ui";

import types from 'prop-types';
import React, { PureComponent } from 'react';



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
      <div className="page">
        <Row>
          <Col>
            <Table
              items={items}
              columns={[
                {
                  title: 'Номер',
                  alias: 'externalId',
                },
                {
                  title: 'Детали',
                  alias: 'details'
                },
                {
                  title: 'Способ оплаты',
                  alias: 'paymentMethod'
                },
                {
                  title: 'Сумма',
                  alias: 'amount'
                },
                {
                  title: 'Статус',
                  alias: 'status'
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
