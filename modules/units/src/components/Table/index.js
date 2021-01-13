
import { Button, Actions } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';
import { Dialog, Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormModify from '../FormModify';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { createUnit, updateUnit, deleteUnit } from '../../ducks/commands';


function List() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleCreate() {
    dispatch(openDialog('unit'));
  }

  function handleEdit(value) {
    dispatch(openDialog('unit', value));
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
    dispatch(deleteUnit([ id ]));
    dispatch(closeDialog('confirm'));
  }

  function submitModify(data) {
    if ('id' in data) {
      dispatch(updateUnit(data));
    }
    else {
      dispatch(createUnit(data));
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
          />
          <Column
            title="Описание"
            alias="description"
            align="left"
          />
          <Column
            align="right"
            width="80"
          >
            {(value) => <Actions onEdit={() => handleEdit(value)} onDelete={() => handleSetDeletedItem(value['id'])} />}
          </Column>
        </Table>
      </div>
      <div className={styles['controls']}>
        <Button mode="success" onClick={() => handleCreate()}>Добавить</Button>
      </div>

      <Dialog title="Единица измерения" name="unit">
        <FormModify onSubmit={(data) => submitModify(data)} />
      </Dialog>

      <Confirm
        message="Вы уверены, что хотите удалить Единицу измерения?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;