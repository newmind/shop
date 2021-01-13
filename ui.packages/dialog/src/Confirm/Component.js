
import { Mode } from '@ui.packages/types';
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
    <Dialog name={name} title={title} mode={Mode.DANGER} onClose={() => handleCancel()}>
      <div className={styles['confirm']}>
        <p className={styles['confirm__message']}>{ message }</p>
        <div className={styles['confirm__controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Mode.DEFAULT}
            onClick={() => handleCancel()}
          >Отмена</Button>
          <Button
            mode={Mode.DANGER}
            onClick={() => handleConfirm()}
          >Подтверждаю</Button>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  name: types.string,
  title: types.string,
  message: types.string,
  onConfirm: types.func,
  onCancel: types.func,
};

ConfirmDialog.defaultProps = {
  name: 'confirm',
  title: null,
  message: null,
  onCancel: null,
  onConfirm: null,
};

export default ConfirmDialog;
