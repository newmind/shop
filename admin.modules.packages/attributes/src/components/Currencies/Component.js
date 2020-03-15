
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
    createCurrency: types.func,
    updateCurrency: types.func,
    deleteCurrencies: types.func,
  };

  static defaultProps = {
    items: [],
  };

  _handleCreate() {
    const { openDialog } = this.props;
    openDialog('currency');
  }

  _handleEdit(id) {

  }

  _handleDelete(id) {
    const { deleteCurrencies } = this.props;
    deleteCurrencies([ id ]);
  }

  _submitModify(data) {
    const { createCurrency, updateCurrency } = this.props;

    if ('id' in data) {
      updateCurrency(data);
    }
    else {
      createCurrency(data);
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
        <Dialog title="Валюта" name="currency">
          <Form onSubmit={this._submitModify.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

export default Component;
