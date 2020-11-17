
import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useRef } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Dialog({ isOpen, data, name, title, mode, actionDialogName, children, closeDialog, onClose }) {
  const wrapperRef = useRef(null);

  function handleCloseDialog() {
    closeDialog(name);
    onClose && onClose(name);
  }

  function handleOutClick(event) {
    const { current: wrapperElement } = wrapperRef;

    const target = event.target;

    if (wrapperElement === target) {
      handleCloseDialog();
    }
  }

  const classNameCloseDialog = cn('fas fa-times', styles['dialog__close']);
  const classNameDialog = cn(styles['dialog'], {
    [styles['dialog--primary']]: mode === PRIMARY_MODE,
    [styles['dialog--success']]: mode === SUCCESS_MODE,
    [styles['dialog--info']]: mode === INFO_MODE,
    [styles['dialog--danger']]: mode === DANGER_MODE,
    [styles['dialog--warning']]: mode === WARNING_MODE,
  });

  return isOpen && (name === actionDialogName) && ReactDOM.createPortal((
    <div ref={this.wrapperRef} className={styles['wrapper']} onClick={handleOutClick}>
      <div className={classNameDialog}>
        <span className={classNameCloseDialog} onClick={handleCloseDialog} />
        {title && (
          <div className={styles['dialog__header']}>
            <h3>{ title }</h3>
          </div>
        )}
        <div className={styles['dialog__content']}>
          { React.cloneElement(children, { data }) }
        </div>
      </div>
    </div>
  ), document.querySelector('#dialog'));
}

Dialog.propTypes = {
  isOpen: types.bool,
  title: types.string,
  name: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  actionDialogName: types.string,
  closeDialog: types.func,
  onClose: types.func,
};

Dialog.defaultProps = {
  isOpen: false,
  title: null,
  name: null,
  mode: 'default',
};

export default Dialog;
