
import numeral from '@packages/numeral';

import { Actions, Select, Text } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectItems, selectMeta, selectInProcess } from '../../ducks/slice';


function getCustomerName(value) {
  let name = '';
  if (value['surname']) {
    name += value['surname'];
  }
  if (value['name']) {
    name += ' ' + value['name'];
  }
  if (value['patronymic']) {
    name += ' ' + value['patronymic'];
  }
  return name.trim();
}

function List() {
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  function handleChangeStatus(code, statusCode) {
    const { updateStatus } = this.props;
    updateStatus(code, statusCode);
  }

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Найдено { meta['total'] } заказов</p>
      </div>
      <Table columns={items}>
        <Column
          title="Счет"
          align="left"
        >{(value) => (
          <div>
            <Text><b>Номер:</b> { value['externalId'] }</Text>
            <Text><b>Сумма:</b> { numeral(value['price']).format() } { value['currency']['value'] }</Text>
          </div>
        )}</Column>
        <Column
          title="Покупатель"
          align="left"
        >
          {(value) => (
            <div>
              <Text>{ getCustomerName(value['customer']) }</Text>
              <Text><b>Доставка:</b> { value['delivery']['name'] }</Text>
              <Text><b>Оплата:</b> { value['payment']['name'] }</Text>
            </div>
          )}
        </Column>
        <Column
          title="Статус"
          width="160"
        >{(order) => (
          <Select
            simple
            clearable={false}
            options={[]}
            optionKey="code"
            optionValue="name"
            value={100}
            disabled={inProcess}
            onChange={() => handleChangeStatus(order)}
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
