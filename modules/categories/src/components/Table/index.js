
import { Table, Column } from '@ui.packages/table';
import { Actions, Text } from '@ui.packages/kit';
import { Dialog, Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormModify from '../FormModify';
import Sub from './Sub';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { createCategory, updateCategory, deleteCategory } from '../../ducks/commands';


function Categories() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleEdit(value) {
    dispatch(openDialog('category', value));
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
    dispatch(deleteCategory([ id ]));
    dispatch(closeDialog('confirm'));
  }

  function submitModify(data) {
    if ('id' in data) {
      dispatch(updateCategory(data));
    }
    else {
      dispatch(createCategory(data));
    }
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table
          useSub
          subTemplate={(data) => (
            <Sub data={data} onEdit={(item) => handleEdit(item)} onDelete={(id) => handleSetDeletedItem(id)} />
          )}
          columns={items}
        >
          <Column
            title="Значение"
            alias="value"
            width="250"
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

      <Dialog title="Категория продукта" name="category">
        <FormModify onSubmit={(data) => submitModify(data)} />
      </Dialog>

      <Confirm
        message="Вы уверены, что хотите удалить Категорию продукта?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

Categories.propTypes = {};

Categories.defaultProps = {};

export default Categories;
