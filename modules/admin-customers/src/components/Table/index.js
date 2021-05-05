
import { Table, Column } from '@ui.packages/table';
import { Actions, Text } from '@ui.packages/kit';
import { openDialog } from '@ui.packages/dialog';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';


function getAddress(value) {
  let address = '';

  if (value['postcode']) {
    address += value['postcode'];
  }
  else {
    address += '---';
  }
  if (value['country']) {
    address += ', ' + value['country'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['region']) {
    address += ', ' + value['region'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['district']) {
    address += ', ' + value['district'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['locality']) {
    address += ', ' + value['locality'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['street']) {
    address += ', ' + value['street'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['home']) {
    address += ', д.' + value['home'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['float']) {
    address += ', эт.' + value['float'];
  }
  else {
    address += ', ' + '---';
  }
  if (value['flat']) {
    address += ', кв.' + value['flat'];
  }
  else {
    address += ', ' + '---';
  }
  return address;
}

function List() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  // const [itemId, setItemId] = useState(null);

  function handleEdit(value) {
    dispatch(openDialog('currency', value));
  }

  function handleSetDeletedItem() {
    // setItemId(id);
    dispatch(openDialog('confirm'));
  }

  // function handleResetDeletedItem() {
  //   setItemId(null);
  //   dispatch(closeDialog('confirm'));
  // }

  // function handleDelete(id) {
  //   dispatch(deleteCurrencies([ id ]));
  //   dispatch(closeDialog('confirm'));
  // }

  // function submitModify(data) {
  //   if ('uuid' in data) {
  //     dispatch(updateCurrency(data));
  //   }
  //   else {
  //     dispatch(createCurrency(data));
  //   }
  // }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title="Имя"
            align="left"
            width="250"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value['surname'] } { value['name'] } { value['patronymic'] }</Text>}
          </Column>
          <Column
            title="Адрес"
            alias="address"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_DEFAULT}>{ getAddress(value) }</Text>}
          </Column>
          <Column
            align="right"
            width="45"
          >
            {(value) => <Actions onEdit={() => handleEdit(value)} onDelete={() => handleSetDeletedItem(value['uuid'])} />}
          </Column>
        </Table>
      </div>

      {/*<Confirm*/}
      {/*  message="Вы уверены, что хотите удалить Валюту?"*/}
      {/*  onConfirm={() => handleDelete(itemId)}*/}
      {/*  onCancel={() => handleResetDeletedItem()}*/}
      {/*/>*/}
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
