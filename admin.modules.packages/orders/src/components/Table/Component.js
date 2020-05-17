
import numeral from '@packages/numeral';
import { Actions, Select } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import types from "prop-types";
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    meta: types.object,
    ordersInProcess: types.array,
  };

  static defaultProps = {
    items: [],
    meta: {},
    ordersInProcess: [],
  };

  _handleChangeStatus(code, statusCode) {
    const { updateStatus } = this.props;
    updateStatus(code, statusCode);
  }

  render() {
    const { items, meta, statuses, ordersInProcess } = this.props;

    return (
      <div className={styles['block']}>
        <div className={styles['header']}>
          <p className={styles['header__title']}>Найдено { meta['total'] } заказов</p>
        </div>
        <Table columns={items}>
          <Column
            title="Детали"
            align="left"
          >{(value) => (
            <div className={styles['details']}>
              <span className={styles['details__line']}><b>Номер:</b> {value['externalId']}</span>
              <span className={styles['details__line']}><b>Заказчик:</b> {value['surname']} {value['name']}</span>
              <span className={styles['details__line']}><b>Контакты:</b> {value['phone']} [{value['email']}]</span>
              <span className={styles['details__line']}><b>Адрес:</b> {value['address']}</span>
            </div>
          )}</Column>
          <Column
            title="Способ доставки"
            alias="delivery"
            width="150"
            align="right"
          />
          <Column
            title="Сумма"
            width="150"
            align="right"
          >{(value) => (
            <div className={styles['amount']}>
              <span className={styles['amount__value']}>{ numeral(value['amount']).format() }</span>
              <span className={styles['amount__currency']}>{ value['currency']['value'] }</span>
            </div>
          )}</Column>
          <Column
            title="Статус"
            width="160"
          >{(order) => (
            <Select
              simple
              clearable={false}
              options={statuses}
              optionKey="code"
              optionValue="name"
              value={order['status']['code']}
              disabled={ !!~ ordersInProcess.indexOf(order['externalId'])}
              onChange={this._handleChangeStatus.bind(this, order)}
            />
          )}</Column>
          <Column
            align="right"
            width="40"
          >{() => <Actions onEdit={()=>{}} />}</Column>
        </Table>
      </div>
    );
  }
}

export default Component;
