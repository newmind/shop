
import moment from '@packages/moment';

import { Actions, Text } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';
import { Dialog, Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormModify from '../FormModify';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { createPromotion, updatePromotion, deletePromotions } from '../../ducks/commands';


function List() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleEdit(value) {
    dispatch(openDialog('promotion', value));
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
    dispatch(deletePromotions([ uuid ]));
    dispatch(closeDialog('confirm'));
  }

  function submitModify(data) {
    if ('id' in data) {
      dispatch(updatePromotion(data));
    }
    else {
      dispatch(createPromotion(data));
    }
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column width="10">
            {(value) => {
              const today = moment().format('YYYY-MM-DD');
              const dateFrom = moment(value['dateFrom']).format('YYYY-MM-DD');
              const dateTo = moment(value['dateTo']).format('YYYY-MM-DD');

              return (<span className={cn(styles['marker'], {
                [styles['marker--active']]: moment(today).isBetween(dateFrom, dateTo, undefined, '[]'),
                [styles['marker--will']]: moment(today).isBefore(dateFrom) && moment(today).isBefore(dateTo),
              })} />)
            }}
          </Column>
          <Column
            title="Название"
            alias="name"
            width="200"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
          </Column>
          <Column
            title="Скидка"
            alias="percent"
            width="70"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value } %</Text>}
          </Column>
          <Column
            title="Описание"
            alias="description"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
          </Column>
          <Column
            title="Период"
            width="100"
          >
            {(value) => (
              <div>
                <Text>{ moment(value['dateFrom']).format('DD.MM.YYYY') }</Text>
                <Text>{ moment(value['dateTo']).format('DD.MM.YYYY') }</Text>
              </div>

            )}
          </Column>
          <Column
            align="right"
            width="45"
          >
            {(value) => <Actions onEdit={() => handleEdit(value)} onDelete={() => handleSetDeletedItem(value['id'])} />}
          </Column>
        </Table>
      </div>

      <Dialog title="Скидка" name="promotion">
        <FormModify onSubmit={(data) => submitModify(data)} />
      </Dialog>

      <Confirm
        message="Вы уверены, что хотите удалить Скидку?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
