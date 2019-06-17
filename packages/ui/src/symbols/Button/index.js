
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    type: types.oneOf(['button', 'submit']),
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    caption: types.string,
    children: types.any,
    disabled: types.bool,
    onClick: types.func,
  };

  static defaultProps = {
    type: 'button',
    mode: 'default',
    caption: null,
    disabled: false,
    children: 'Button'
  };

  _handleClick() {
    const { onClick } = this.props;
    onClick && onClick();
  }

  render() {
    const { type, className, caption, children, disabled, mode } = this.props;
    const classNameButton = cn(className, styles['button'], {
      [styles['button--primary']]: mode === PRIMARY_MODE,
      [styles['button--success']]: mode === SUCCESS_MODE,
      [styles['button--info']]: mode === INFO_MODE,
      [styles['button--danger']]: mode === DANGER_MODE,
      [styles['button--warning']]: mode === WARNING_MODE,
      [styles['button--disabled']]: disabled,
    });
    return (
      <button type={type} className={classNameButton} onClick={this._handleClick.bind(this)} disabled={disabled}>
        {caption || children}
      </button>
    );
  }
}

export default Component;
