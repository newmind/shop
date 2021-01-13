
import { Button, Actions } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';
import { Dialog, Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormModify from '../FormModify';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { createCategory, updateCategory, deleteCategory } from '../../ducks/commands';


function Categories() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleCreate() {
    dispatch(openDialog('category'));
  }

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
            title="Изображение"
            alias="imageId"
            width="140"
            align="center"
          >{(value) => {
            return value ? <img src={`${process.env['REACT_APP_API_HOST']}/gallery/${value}`} width="40" alt="" /> : null;
          }}
          </Column>
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
