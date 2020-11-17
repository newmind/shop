
import { Button } from "@ui.packages/kit";

import types from 'prop-types';
import React from 'react';

import Dialog from '../Dialog';

import styles from './defaults.module.scss';


function ConfirmDialog({ name, title, message, onConfirm, onCancel }) {
  function handleConfirm() {
    onConfirm && onConfirm();
  }

  function handleCancel() {
    onCancel && onCancel();
  }

  return (
    <Dialog name={name} title={title} mode="danger" onClose={handleCancel}>
      <div className={styles['confirm']}>
        <p className={styles['confirm__message']}>{ message }</p>
        <div className={styles['confirm__controls']}>
          <Button mode="danger" onClick={handleConfirm}>Подтверждаю</Button>
          <Button onClick={handleCancel}>Отмена</Button>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  name: types.string,
  title: types.string,
  message: types.string,
  onConfirm: null,
  onCancel: null,
};

ConfirmDialog.defaultProps = {
  name: 'confirm',
  title: null,
  message: null,
};

export default ConfirmDialog;
