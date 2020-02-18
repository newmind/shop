
import { Confirm, Dialog } from "@ui.packages/dialog";
import { Table, Column } from "@ui.packages/table";
import { Actions, Row, Col } from '@ui.packages/ui';

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import FormModify from './FormModify';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    getComments: types.func,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    commentId: null,
    comment: null,
  };

  _handleCancelRemove() {
    const { closeDialog } = this.props;

    this.setState({ commentId: null }, () => closeDialog('remove-confirm'));
  }

  _handleRemoveComment(id) {
    const { openDialog } = this.props;

    this.setState({ commentId: id }, () => openDialog('remove-confirm'));
  }

  _handleEditComment(id) {
    const { openDialog } = this.props;

    this.setState({ commentId: id }, () => openDialog('comment-modify'));
  }

  async _handleConfirmRemove() {
    const { commentId } = this.state;
    const { deleteComments, closeDialog } =  this.props;

    await deleteComments([ commentId ]);

    this.setState({ commentId: null }, () => closeDialog('remove-confirm'));
  }

  render() {
    const { items } = this.props;

    return (
      <div className="page">
        <Row>
          <Col>
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
                title="Имя комментирующего"
                alias="person"
                width="200"
                align="left"
              />
              <Column
                title="Текст комментария"
                alias="comment"
                align="left"
              />
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
          </Col>
        </Row>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить комментарий?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
        <Dialog title="Доавить комментарий" name="comment-modify">
          <FormModify onSubmit={() => {}} />
        </Dialog>
      </div>
    );
  }
}

export default Component;
