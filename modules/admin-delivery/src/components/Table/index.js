
import { updateDelivery, selectItems, selectInProcess } from '@modules/admin-delivery';

import { Text, CheckBox } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Deliveries() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  function handleUpdate(code, status) {
    dispatch(updateDelivery(code, status));
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title="Название"
            alias="name"
            width="200"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
          </Column>
          <Column
            title="Описание"
            alias="description"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
          </Column>
          <Column
            title="Видим"
            width="50"
          >
            {({ code, isUse }) => <CheckBox value={isUse} disabled={inProcess} onChange={(value) => handleUpdate(code, value)} />}
          </Column>
        </Table>
      </div>
    </div>
  );
}

Deliveries.propTypes = {};

Deliveries.defaultProps = {};

export default Deliveries;
