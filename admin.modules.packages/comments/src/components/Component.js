
import { Confirm, Dialog } from "@ui.packages/dialog";
import { Table, Column } from "@ui.packages/table";
import { Actions, Row, Col } from '@ui.packages/ui';

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import FormModify from './FormModify';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    getComment: types.func,
    getComments: types.func,
    updateComment: types.func,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    commentId: null,
    comment: null,
  };

  async _handleUpdate(formData) {
    const { updateComment, closeDialog } = this.props;

    await updateComment(formData);
    closeDialog('remove-confirm');
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;

    this.setState({ commentId: null }, () => closeDialog('remove-confirm'));
  }

  _handleRemoveComment(id) {
    const { openDialog } = this.props;

    this.setState({ commentId: id }, () => openDialog('remove-confirm'));
  }

  async _handleEditComment(id) {
    const { getComment, openDialog } = this.props;
    const comment = await getComment(id);

    this.setState({ comment }, () => openDialog('comment-modify'));
  }

  async _handleConfirmRemove() {
    const { commentId } = this.state;
    const { deleteComments, closeDialog } =  this.props;

    await deleteComments([ commentId ]);

    this.setState({ commentId: null }, () => closeDialog('remove-confirm'));
  }

  render() {
    const { comment } = this.state;
    const { items } = this.props;

    return (
      <div className={styles['wrapper']}>
        <Row>
          <Col>
            <div className={styles['block']}>
              <Table columns={items}>
                <Column
                  title="ID"
                  alias="id"
                  width="30"
                  align="left"
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
                      <Link className={styles['link']} to={'/products/' + product['id']}>{ product['brand'] }</Link>
                    )
                  }}
                </Column>
                <Column
                  align="right"
                  width="70"
                >
                  {({ id }) => (
                    <Actions
                      onEdit={this._handleEditComment.bind(this, id)}
                      onDelete={this._handleRemoveComment.bind(this, id)}
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
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
        <Dialog title="Редактировать комментарий" name="comment-modify">
          <FormModify initialValues={comment} onSubmit={this._handleUpdate.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

export default Component;
