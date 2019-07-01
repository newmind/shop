
import types from 'prop-types';
import React, { PureComponent } from 'react';

import {Confirm, Dialog} from "@packages/dialog";
import {Table, Row, Col, Button} from '@packages/ui';

import ModifyDialog from "./ModifyDialog";

import cn from 'classnames';
import styles from './default.module.scss';


const DIALOG_NAME = 'modify-category';
const ALERT_NAME = 'remove-confirm';


class Component extends PureComponent {
  static propTypes = {
    categories: types.array,
    inProcess: types.bool,
  };

  static defaultProps = {
    categories: [],
    inProcess: false,
  };

  state = {
    categoryId: null,
    category: null,
  };

  _handleOpenModifyDialog(category) {
    const { openDialog } = this.props;
    this.setState({ category }, () => openDialog(DIALOG_NAME));
  }

  _handleCreateDialog() {
    const { openDialog } = this.props;
    openDialog(DIALOG_NAME);
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ categoryId: null }, () => closeDialog(ALERT_NAME));
  }

  _handleOpenConfirmRemoveProduct(categoryId) {
    const { openDialog } = this.props;
    this.setState({ categoryId }, () => openDialog(ALERT_NAME));
  }

  async _handleConfirmRemove() {
    const { categoryId } = this.state;
    const { deleteById, closeDialog } = this.props;
    await deleteById(categoryId);
    this.setState({ categoryId: null }, () => closeDialog(ALERT_NAME));
  }

  async _handleSubmit(formData) {
    const { create, closeDialog } = this.props;
    await create(formData);
    closeDialog(DIALOG_NAME);
  }

  async _handleUpdate(formData) {
    const { updateById, closeDialog } = this.props;
    await updateById(formData);
    this.setState({ category: null }, () => closeDialog(DIALOG_NAME));
  }

  render() {
    const { category } = this.state;
    const { categories, inProcess } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" disabled={inProcess} onClick={this._handleCreateDialog.bind(this)}>Добавить категорию</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              items={categories}
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
                  alias: 'name',
                  title: 'Наименование',
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
                  template: (category) => {
                    const toEditClassName = cn(styles['actions__item'], styles['actions__item--edit'], 'fas fa-pencil-alt');
                    const toRemoveClassName = cn(styles['actions__item'], styles['actions__item--trash'], 'far fa-trash-alt');
                    return (
                      <div className={styles['actions']}>
                        <span className={toEditClassName} onClick={this._handleOpenModifyDialog.bind(this, category)} />
                        <span className={toRemoveClassName} onClick={this._handleOpenConfirmRemoveProduct.bind(this, category['id'])} />
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
        <Dialog name="modify-category" title={category ? 'Редактировать категорию' : 'Добавить категорию'}>
          <ModifyDialog
            initialValues={category}
            onSubmit={category ? this._handleUpdate.bind(this) : this._handleSubmit.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}

export default Component;
