
import { Button, Actions } from '@ui.packages/ui';
import { Dialog } from '@ui.packages/dialog';
import { Table, Column } from '@ui.packages/table';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import Form from '../_FormModify';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    openDialog: types.func,
    closeDialog: types.func,
    createType: types.func,
    updateType: types.func,
    deleteTypes: types.func,
  };

  static defaultProps = {
    items: [],
  };

  _handleCreate() {
    const { openDialog } = this.props;
    openDialog('type');
  }

  _handleEdit(id) {

  }

  _handleDelete(id) {
    const { deleteTypes } = this.props;
    deleteTypes([ id ]);
  }

  _submitModify(data) {
    const { createType, updateType } = this.props;

    if ('id' in data) {
      updateType(data);
    }
    else {
      createType(data);
    }
  }

  render() {
    const { items } = this.props;

    return (
      <div className={styles['content']}>
        <div className={styles['table']}>
          <Table columns={items}>
            <Column
              title="ID"
              alias="id"
              width="40"
            />
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
              width="40"
            >
              {({ id }) => <Actions onDelete={this._handleDelete.bind(this, id)} />}
            </Column>
          </Table>
        </div>
        <div className={styles['controls']}>
          <Button mode="success" onClick={this._handleCreate.bind(this)}>Добавить</Button>
        </div>
        <Dialog title="Тип продукта" name="type">
          <Form onSubmit={this._submitModify.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

export default Component;
