
import types from 'prop-types';
import React, { PureComponent } from 'react';

// import numeral from '@ui.packages/numeral';
import { Confirm, Dialog } from "@ui.packages/dialog";
import { Table, Row, Col, Button } from '@ui.packages/ui';

import CurrencyModifyDialog from './CurrencyModifyDialog';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    currencies: types.array,
    inProcess: types.bool,
  };

  static defaultProps = {
    currencies: [],
    inProcess: false,
  };

  state = {
    currencyId: null,
    currency: null,
  };

  _handleOpenConfirmRemoveDialog(id) {
    const { openDialog } = this.props;
    this.setState({ currencyId: id }, () => openDialog('remove-confirm'))
  }

  _handleAddCurrencyDialogOpen() {
    const { openDialog } = this.props;
    openDialog('modify-currency');
  }

  _handleOpenUpdateDialog(currency) {
    const { openDialog } = this.props;
    this.setState({ currency }, () => openDialog('modify-currency'));
  }

  async _handleSubmit(formData) {
    const { create, closeDialog } = this.props;
    await create(formData);
    closeDialog('modify-currency');
  }

  async _handleUpdate(formData) {
    const { updateById, closeDialog } = this.props;
    await updateById(formData);
    this.setState({ currency: null }, () => closeDialog('remove-confirm'));
  }

  async _handleConfirmRemove() {
    const { currencyId } = this.state;
    const { deleteById, closeDialog } = this.props;
    await deleteById(currencyId);
    this.setState({ currencyId: null, currency: null }, () => closeDialog('remove-confirm'));
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ currencyId: null, currency: null }, () => closeDialog('remove-confirm'));
  }

  render() {
    const { currency } = this.state;
    const { currencies, inProcess } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" disabled={inProcess} onClick={this._handleAddCurrencyDialogOpen.bind(this)}>Добавить валюту</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              items={currencies}
              columns={[
                {
                  alias: 'id',
                  title: 'ID',
                  attrs: {
                    width: '50px',
                    align: 'right',
                  }
                },
                {
                  alias: 'value',
                  title: 'Значение',
                  attrs: {
                    width: '150px',
                  }
                },
                {
                  alias: 'description',
                  title: 'Описание',
                },
                {
                  attrs: {
                    width: '70px',
                    vAlign: 'middle',
                  },
                  template: (currency) => {
                    const deleteClassName = cn(styles['actions__item'], styles['actions__item--trash'], 'far fa-trash-alt');
                    const editClassName = cn(styles['actions__item'], styles['actions__item--edit'], "fas fa-pencil-alt");
                    return (
                      <div className={styles['actions']}>
                        <span className={editClassName} onClick={this._handleOpenUpdateDialog.bind(this, currency)} />
                        <span className={deleteClassName} onClick={this._handleOpenConfirmRemoveDialog.bind(this, currency['id'])} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить валюту?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
        <Dialog title={currency ? 'Редактировать валюту' : 'Добавить валюту'} name="modify-currency">
          <CurrencyModifyDialog
            initialValues={currency}
            onSubmit={currency ? this._handleUpdate.bind(this) : this._handleSubmit.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}

export default Component;
