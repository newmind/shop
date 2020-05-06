
import types from 'prop-types';
import React, { Component as PureComponent } from 'react';

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
    type: types.oneOf(['text', 'password']),
    format: types.oneOf(['string', 'number']),
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.any,
    disabled: types.bool,
    onChange: types.func,
    onInput: types.func,
    onFocus: types.func,
    onBlur: types.func,
  };

  static defaultProps = {
    className: '',
    type: 'text',
    format: 'string',
    mode: 'default',
    label: null,
    message: null,
    value: '',
    disabled: false,
  };

  state = {
    isFocus: false,
  };

  _handleFocus = (event) => {
    const { onFocus } = this.props;

    event.stopPropagation();

    onFocus && onFocus(event);
    this.setState({ isFocus: true });
  };

  _handleBlur = (event) => {
    const { onBlur } = this.props;

    event.stopPropagation();

    onBlur && onBlur(event);
    this.setState({ isFocus: false });
  };

  render() {
    const { isFocus } = this.state;
    const { className, disabled, mode, label, message, ...props } = this.props;

    const classNameInputContainer = cn(className, styles['container'], {
      [styles['container--focus']]: isFocus,
    }, {
      [styles['container--primary']]: mode === PRIMARY_MODE,
      [styles['container--success']]: mode === SUCCESS_MODE,
      [styles['container--info']]: mode === INFO_MODE,
      [styles['container--danger']]: mode === DANGER_MODE,
      [styles['container--warning']]: mode === WARNING_MODE,
      [styles['container--disabled']]: disabled,
      [styles['container--with-label']]: !! label,
    });

    return (
      <div className={classNameInputContainer}>
        <input
          className={styles['input']}
          disabled={disabled}
          {...props}
          onFocus={this._handleFocus.bind(this)}
          onBlur={this._handleBlur.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
