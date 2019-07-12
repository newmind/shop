
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Confirm, Dialog } from "@ui.packages/dialog";
import {Table, Row, Col, Button} from '@ui.packages/ui';

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
    unitId: null,
    unit: null,
  };

  _handleOpenModifyDialog(unit) {
    const { openDialog } = this.props;
    this.setState({ unit }, () => openDialog('unit-modify'));
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ unitId: null }, () => closeDialog('remove-confirm'));
  }

  _handleOpenConfirmRemove(unitId) {
    const { openDialog } = this.props;
    this.setState({ unitId }, () => openDialog('remove-confirm'));
  }

  _handleConfirmRemove() {
    const { unitId } = this.state;
    const { removeUnitById } = this.props;
    removeUnitById(unitId);
  }

  _handleAddUnityDialogOpen() {
    const { openDialog } = this.props;
    openDialog('unit-modify');
  }

  _handleSaveUnit(formData) {
    const { createUnit } = this.props;
    createUnit(formData);
  }

  _updateUnit(formData) {
    const { updateUnitById } = this.props;
    updateUnitById(formData);
  }

  render() {
    const { unit } = this.state;
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
                  title: 'ID',
                  attrs: {
                    width: '50px',
                    align: 'right'
                  }
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
                  template: (unit) => {
                    const toEditClassName = cn(styles['actions__item'], styles['actions__item--edit'], 'fas fa-pencil-alt');
                    const toRemoveClassName = cn(styles['actions__item'], styles['actions__item--trash'], 'far fa-trash-alt');
                    return (
                      <div className={styles['actions']}>
                        <span className={toEditClassName} onClick={this._handleOpenModifyDialog.bind(this, unit)} />
                        <span className={toRemoveClassName} onClick={this._handleOpenConfirmRemove.bind(this, unit['id'])} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
        <Dialog name="unit-modify" title={unit ? "Редактировать единицу измерения" : "Добавить единицу измерения"}>
          <Form initialValues={unit} onSubmit={unit ? this._updateUnit.bind(this) : this._handleSaveUnit.bind(this)} />
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
