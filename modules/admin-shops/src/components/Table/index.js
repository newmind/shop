
import { selectItems, deleteShop } from '@modules/admin-shops';

import { Actions, Text } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';
import { Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function ShopsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/shops/' + uuid);
  }

  function handleSetDeletedItem(uuid) {
    setItemId(uuid);
    dispatch(openDialog('confirm'));
  }

  function handleResetDeletedItem() {
    setItemId(null);
    dispatch(closeDialog('confirm'));
  }

  function handleDelete(uuid) {
    setItemId(null);
    dispatch(deleteShop(uuid));
    dispatch(closeDialog('confirm'));
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title={'Магазин'}
            alias={'name'}
            width={200}
            align={'left'}
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
          </Column>
          <Column
            title={'Адрес'}
            alias={'address'}
            width={200}
            align={'left'}
          >
            {(value) => <Text>{ value }</Text>}
          </Column>
          <Column
            title={'Описание'}
            alias={'description'}
            align={'left'}
          >
            {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
          </Column>
          <Column
            align={'right'}
            width={45}
          >
            {(value) => (
              <Actions
                onEdit={() => handleEdit(value['uuid'])}
                onDelete={() => handleSetDeletedItem(value['uuid'])}
              />
            )}
          </Column>
        </Table>
      </div>

      <Confirm
        message="Вы уверены, что хотите удалить Магазин?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

ShopsList.propTypes = {};

ShopsList.defaultProps = {};

export default ShopsList;
