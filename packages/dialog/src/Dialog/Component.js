
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    isOpen: types.bool,
    title: types.string,
    name: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    actionDialogName: types.string,
    closeDialog: types.func,
    onClose: types.func,
  };

  static defaultProps = {
    isOpen: false,
    title: null,
    name: null,
    mode: 'default',
  };

  _handleCloseDialog() {
    const { name, closeDialog, onClose } = this.props;
    closeDialog(name);
    onClose && onClose(name);
  }

  render() {
    const { isOpen, name, title, mode, actionDialogName, children } = this.props;
    const classNameCloseDialog = cn('fas fa-times', styles['dialog__close']);
    const classNameDialog = cn(styles['dialog'], {
      [styles['dialog--primary']]: mode === PRIMARY_MODE,
      [styles['dialog--success']]: mode === SUCCESS_MODE,
      [styles['dialog--info']]: mode === INFO_MODE,
      [styles['dialog--danger']]: mode === DANGER_MODE,
      [styles['dialog--warning']]: mode === WARNING_MODE,
    });
    return isOpen && (name === actionDialogName) && (
      <div className={styles['wrapper']}>
        <div className={classNameDialog}>
          <span className={classNameCloseDialog} onClick={this._handleCloseDialog.bind(this)} />
          {title && (
            <div className={styles['dialog__header']}>
              <h3>{ title }</h3>
            </div>
          )}
          <div className={styles['dialog__content']}>
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
