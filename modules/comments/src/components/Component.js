
import { Table, Column } from "@ui.packages/table";
import { Actions, Row, Col, Header } from '@ui.packages/kit';
import { Confirm, openDialog, closeDialog } from "@ui.packages/dialog";

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteComments } from '../ducks/commands';
import { selectItems } from '../ducks/slice';

import styles from './default.module.scss';


function Comments() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [commentId, setCommentId] = useState(null);

  // async _handleUpdate(formData) {
  //   const { updateComment, closeDialog } = this.props;
  //
  //   await updateComment(formData);
  //   closeDialog('remove-confirm');
  // }

  function handleCancelRemove() {

    setCommentId(null);
    dispatch(closeDialog('remove-confirm'));
  }

  function handleRemoveComment(id) {

    setCommentId(id);
    dispatch(openDialog('remove-confirm'));
  }

  // async _handleEditComment(id) {
  //   const { getComment, openDialog } = this.props;
  //   const comment = await getComment(id);
  //
  //   this.setState({ comment }, () => openDialog('comment-modify'));
  // }

  function handleConfirmRemove() {

    dispatch(deleteComments([ commentId ]));
    setCommentId(null);
    dispatch(closeDialog('remove-confirm'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Комментарии</Header>
      </div>
      <Row>
        <Col>
          <div className={styles['block']}>
            <Table columns={items}>
              <Column
                title="ID"
                alias="id"
                width="30"
                align="right"
              />
              <Column
                title="Оценка"
                alias="evaluation"
                width="80"
                align="left"
              />
              <Column
                title="Автор"
                alias="person"
                width="200"
                align="left"
              />
              <Column
                title="Комментарий"
                alias="comment"
                align="left"
              />
              <Column
                title="Продукт"
                alias="product"
              >
                {(product) => {
                  return product && (
                    <Link className={styles['link']} to={'/products/' + product['uuid']}>{ product['brand'] }</Link>
                  )
                }}
              </Column>
              <Column
                align="right"
                width="70"
              >
                {({ id }) => (
                  <Actions
                    // onEdit={() => handleEditComment(id)}
                    onDelete={() => handleRemoveComment(id)}
                  />
                )}
              </Column>
            </Table>
          </div>
        </Col>
      </Row>

      <Confirm
        name="remove-confirm"
        message="Вы уверены, что хотите удалить комментарий?"
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />

      {/*<Dialog title="Редактировать комментарий" name="comment-modify">*/}
        {/*<FormModify initialValues={comment} onSubmit={this._handleUpdate.bind(this)} />*/}
      {/*</Dialog>*/}
    </div>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
