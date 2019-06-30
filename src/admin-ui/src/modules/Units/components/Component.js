
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Confirm, Dialog } from "@packages/dialog";
import {Table, Row, Col, Button} from '@packages/ui';

import Form from './UnitForm';

import cn from 'classnames';
import styles from './default.module.scss';



class Component extends PureComponent {
  static propTypes = {
    units: types.array,
    inProcess: types.bool,
  };

  static defaultProps = {
    units: [],
    inProcess: false,
  };

  state = {
    productId: null,
  };

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  _handleOpenConfirmRemoveProduct(productId) {
    const { openDialog } = this.props;
    this.setState({ productId }, () => openDialog('remove-confirm'));
  }

  _handleConfirmRemove() {
    const { productId } = this.state;
    const { removeProductById } = this.props;
    removeProductById(productId);
  }

  _handleAddUnityDialogOpen() {
    const { openDialog } = this.props;
    openDialog('unit-modify');
  }

  _handleSaveUnit(formData) {
    const { createUnit } = this.props;
    createUnit(formData);
  }

  render() {
    const { units, inProcess } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" disabled={inProcess} onClick={this._handleAddUnityDialogOpen.bind(this)}>Добавить единицу измерения</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              items={units}
              columns={[
                {
                  alias: 'id',
                  title: 'ID'
                },
                {
                  alias: 'value',
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
                  template: ({ id }) => {
                    const toArchiveClassName = cn(styles['actions__item'], styles['actions__item--trash'], 'far fa-trash-alt');
                    return (
                      <div className={styles['actions']}>
                        <span className={toArchiveClassName} onClick={this._handleOpenConfirmRemoveProduct.bind(this, id)} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
        <Dialog name="unit-modify" title="Добавить единицу измерения">
          <Form onSubmit={this._handleSaveUnit.bind(this)} />
        </Dialog>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить значение?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
