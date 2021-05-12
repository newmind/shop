
import numeral from '@packages/numeral';

import { Table, Column } from '@ui.packages/table';
import { nounDeclension } from '@ui.packages/utils';
import { Actions, Select, Header, Text } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectStatuses, selectItems, selectMeta, selectInProcess } from '../../ducks/slice';


function List() {
  const statuses = useSelector(selectStatuses);
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  // function handleChangeStatus(code, statusCode) {
  //   const { updateStatus } = this.props;
  //   updateStatus(code, statusCode);
  // }

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={4}>Найдено { meta['total'] } { nounDeclension(meta['total'], ['заказ', 'заказа', 'заказов'])}</Header>
      </div>
      <Table columns={items}>
        <Column
          title="Счет"
          align="left"
        >{(value) => (
          <div>
            <Text><b>Номер:</b> { value['externalId'] }</Text>
            <Text><b>Сумма:</b> { numeral(value['price']).format() } { value['currency'] }</Text>
          </div>
        )}</Column>
        <Column
          title="Покупатель"
          align="left"
        >
          {(value) => (
            <div>
              <Text>{ value['customer']['name'] }</Text>
              <Text><b>Адрес:</b> { value['delivery'] }</Text>
            </div>
          )}
        </Column>
        <Column
          title="Детали"
          align="left"
        >
          {(value) => (
            <div>
              <Text>{ value['customer']['name'] }</Text>
              <Text><b>Доставка:</b> { value['delivery'] }</Text>
              <Text><b>Оплата:</b> { value['payment'] }</Text>
            </div>
          )}
        </Column>
        <Column
          title="Статус"
          width="160"
        >{() => (
          <Select
            simple
            clearable={false}
            options={statuses}
            optionKey="code"
            optionValue="name"
            value={100}
            disabled={inProcess}
            // onChange={() => handleChangeStatus(client-order)}
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

List.propTypes = {};

List.defaultProps = {};

export default List;
