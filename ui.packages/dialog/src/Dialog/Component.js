
import { Header } from '@ui.packages/kit';

import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useRef } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Dialog({ className, isOpen, data, name, title, actionDialogName, children, closeDialog, onClose }) {
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

  const classNameCloseDialog = cn(styles['close'], 'fas fa-times');
  const classNameDialog = cn(styles['dialog'], className);

  return isOpen && (name === actionDialogName) && ReactDOM.createPortal((
    <div ref={wrapperRef} className={styles['wrapper']} onClick={handleOutClick}>
      <div className={classNameDialog}>
        <span className={classNameCloseDialog} onClick={handleCloseDialog} />
        {title && (
          <div className={styles['header']}>
            <Header level={3}>{ title }</Header>
          </div>
        )}
        <div className={styles['content']}>
          { React.cloneElement(children, { data }) }
        </div>
      </div>
    </div>
  ), document.querySelector('#dialog'));
}

Dialog.propTypes = {
  className: types.string,
  isOpen: types.bool,
  title: types.string,
  name: types.string,
  actionDialogName: types.string,
  closeDialog: types.func,
  onClose: types.func,
};

Dialog.defaultProps = {
  className: null,
  isOpen: false,
  title: null,
  name: null,
};

export default Dialog;
