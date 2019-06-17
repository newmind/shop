
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isOpen: types.bool,
    title: types.string,
    closeDialog: types.func,
  };

  static defaultProps = {
    isOpen: false,
    title: null,
  };

  _handleCloseDialog() {
    const { closeDialog } = this.props;
    closeDialog();
  }

  render() {
    const { isOpen, title, children } = this.props;
    const classNameCloseDialog = cn('fas fa-times', styles['dialog__close']);
    return isOpen && (
      <div className={styles['wrapper']}>
        <div className={styles['dialog']}>
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
