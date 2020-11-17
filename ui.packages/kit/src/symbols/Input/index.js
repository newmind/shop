
import types from 'prop-types';
import React, { useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Input({ value, mode, className, disabled, onBlur, onChange, onFocus, ...props }) {
  const [isFocus, setFocus] = useState(false);

  function handleFocus(event) {
    event.stopPropagation();

    onFocus && onFocus(event);
    setFocus(true);
  }

  function handleBlur(event) {
    event.stopPropagation();

    onBlur && onBlur(event);
    setFocus(false);
  }

  const classNameInputContainer = cn(className, styles['container'], {
    [styles['container--focus']]: isFocus,
  }, {
    [styles['container--primary']]: mode === PRIMARY_MODE,
    [styles['container--success']]: mode === SUCCESS_MODE,
    [styles['container--info']]: mode === INFO_MODE,
    [styles['container--danger']]: mode === DANGER_MODE,
    [styles['container--warning']]: mode === WARNING_MODE,
    [styles['container--disabled']]: disabled,
  });

  return (
    <div className={classNameInputContainer}>
      <input
        className={styles['input']}
        disabled={disabled}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

Input.propTypes = {
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

Input.defaultProps = {
  className: '',
  type: 'text',
  format: 'string',
  mode: 'default',
  message: null,
  value: '',
  disabled: false,
};

export default Input;
