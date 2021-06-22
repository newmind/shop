
import { updatePayment, selectItems, selectInProcess } from '@modules/admin-payments';

import { Text, CheckBox } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Payments() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  function handleUpdate(code, status) {
    dispatch(updatePayment(code, status));
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

Payments.propTypes = {};

Payments.defaultProps = {};

export default Payments;
