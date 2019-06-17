
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from "@packages/ui";

import Dialog from '../Dialog';

import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    title: types.string,
    message: types.string,
    onConfirm: types.func,
    onCancel: types.func,
  };

  static defaultProps = {
    name: '',
    title: 'Подтвердите действие',
    message: 'Вы уверены что хотите совершить действие?',
  };

  _handleConfirm() {
    const { onConfirm } = this.props;
    onConfirm && onConfirm();
  }

  _handleCancel() {
    const { onCancel } = this.props;
    onCancel && onCancel();
  }

  render() {
    const { name, title, message} = this.props;
    return (
      <Dialog name={name} title={title} mode="danger" onClose={this._handleCancel.bind(this)}>
        <div className={styles['confirm']}>
          <p className={styles['confirm__message']}>{ message }</p>
          <div className={styles['confirm__controls']}>
            <Button mode="danger" onClick={this._handleConfirm.bind(this)}>Подтверждаю</Button>
            <Button onClick={this._handleCancel.bind(this)}>Отмена</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Component;
