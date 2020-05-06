
import { Actions } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import types from "prop-types";
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
      <div className={styles['block']}>
        <Table columns={items}>
          <Column
            title="Номер"
            alias="externalId"
            align="left"
          />
          <Column
            title="Детали"
            align="left"
          >{(value) => (
            <div>
              <p><b>Заказчик:</b> {value['surname']} {value['name']}</p>
              <p><b>Контакты:</b> {value['phone']} [{value['email']}]</p>
              <p><b>Адрес:</b> {value['address']}</p>
            </div>
          )}</Column>
          <Column
            title="Способ доставки"
            alias="delivery"
          />
          <Column
            title="Сумма"
          >{(value) => (
            <p><span>{value['amount']}</span><span>{value['currency']['value']}</span></p>
          )}</Column>
          <Column
            title="Статус"
            alias="status"
          />
          <Column>{() => <Actions />}</Column>
        </Table>
      </div>
    );
  }
}

export default Component;
