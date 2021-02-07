
import { Table, Column } from '@ui.packages/table';
import { Actions, Text } from '@ui.packages/kit';
import { Dialog, Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormModify from '../FormModify';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { createType, updateType, deleteTypes } from '../../ducks/commands';


function Types() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);


  function handleEdit(value) {
    dispatch(openDialog('type', value));
  }

  function handleSetDeletedItem(id) {
    setItemId(id);
    dispatch(openDialog('confirm'));
  }

  function handleResetDeletedItem() {
    setItemId(null);
    dispatch(closeDialog('confirm'));
  }

  function handleDelete(id) {
    dispatch(deleteTypes([ id ]));
    dispatch(closeDialog('confirm'));
  }

  function submitModify(data) {
    if ('id' in data) {
      dispatch(updateType(data));
    }
    else {
      dispatch(createType(data));
    }
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title="Значение"
            alias="value"
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
            align="right"
            width="45"
          >
            {(value) => <Actions onEdit={() => handleEdit(value)} onDelete={() => handleSetDeletedItem(value['id'])} />}
          </Column>
        </Table>
      </div>

      <Dialog title="Тип продукта" name="type">
        <FormModify onSubmit={(data) => submitModify(data)} />
      </Dialog>

      <Confirm
        message="Вы уверены, что хотите удалить Тип продукта?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
