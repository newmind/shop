
import moment from '@packages/moment';

import {Column, Table} from "@ui.packages/table";
import { nounDeclension } from "@ui.packages/utils";
import {Actions, Header, Text} from "@ui.packages/kit";
import { closeDialog, Confirm, openDialog } from "@ui.packages/dialog";

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';

import { deleteComments } from "../../ducks/commands";
import { selectItems, selectMeta } from "../../ducks/slice";


export default function TableComments() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);
  const [commentId, setCommentId] = useState(null);

  function handleCancelRemove() {

    setCommentId(null);
    dispatch(closeDialog('confirm'));
  }

  function handleRemoveComment(id) {

    setCommentId(id);
    dispatch(openDialog('confirm'));
  }

  function handleConfirmRemove() {

    dispatch(deleteComments([ commentId ]));
    setCommentId(null);
    dispatch(closeDialog('confirm'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4}>Найдено { meta['total'] } {nounDeclension(meta['total'], ['комментарий', 'комментария', 'комментариев'])}</Header>
      </div>
      <Table columns={items}>
        <Column
          title="ID"
          alias="id"
          width="30"
          align="left"
        >
          {(value) => <Text>{ value }</Text>}
        </Column>
        <Column
          title="Оценка"
          alias="evaluation"
          width="80"
          align="left"
        >
          {(value) => <Text>{ value }</Text>}
        </Column>
        <Column
          title="Автор"
          alias="person"
          width="140"
          align="left"
        >
          {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
        </Column>
        <Column
          title="Комментарий"
          alias="comment"
          align="left"
        >
          {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
        </Column>
        <Column
          title="Продукт"
          alias="product"
          width="140"
        >
          {(product) => {
            return product && (
              <Link className={styles['link']} to={'/products/' + product['uuid']}>{ product['brand'] }</Link>
            )
          }}
        </Column>
        <Column
          title="Дата"
          alias="createdAt"
          align="left"
          width="140"
        >
          {(value) => <Text type={Text.TYPE_DEFAULT}>{ moment(value).format('DD-MM-YYYY HH:mm') }</Text>}
        </Column>
        <Column
          align="right"
          width="45"
        >
          {({ id }) => (
            <Actions
              // onEdit={() => handleEditComment(id)}
              onDelete={() => handleRemoveComment(id)}
            />
          )}
        </Column>
      </Table>

      <Confirm
        name="confirm"
        message="Вы уверены, что хотите удалить комментарий?"
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>
  );
}
