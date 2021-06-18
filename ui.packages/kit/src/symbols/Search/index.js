
import { Mode } from '@ui.packages/types';

import types from 'prop-types';
import React, { useState, forwardRef } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const TYPE_TEXT = 'text';
const TYPE_PASSWORD = 'password';


const Search = forwardRef(({ mode, className, disabled, onBlur, onFocus, ...props}, ref) => {
  const [isFocus, setFocus] = useState(false);

  function handleFocus(event) {
    event.stopPropagation();

    if (disabled) {
      return void 0;
    }

    onFocus && onFocus(event);
    setFocus(true);
  }

  function handleBlur(event) {
    event.stopPropagation();

    if (disabled) {
      return void 0;
    }

    onBlur && onBlur(event);
    setFocus(false);
  }

  const classNameInputContainer = cn(className, styles['container'], {
    [styles['container--focus']]: isFocus,
  }, {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--warning']]: mode === Mode.WARNING,
  }, {
    [styles['disabled']]: disabled,
  });

  return (
    <div className={classNameInputContainer}>
      <input
        ref={ref}
        className={styles['input']}
        disabled={disabled}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className={cn(styles['icon'], 'fas fa-search')} />
    </div>
  );
});

Search.propTypes = {
  className: types.string,
  type: types.oneOf([TYPE_TEXT, TYPE_PASSWORD]),
  format: types.oneOf(['string', 'number']),
  mode: types.oneOf([Mode.DEFAULT, Mode.DANGER, Mode.INFO, Mode.SUCCESS, Mode.PRIMARY, Mode.WARNING]),
  value: types.any,
  disabled: types.bool,
  onChange: types.func,
  onInput: types.func,
  onFocus: types.func,
  onBlur: types.func,
};

Search.defaultProps = {
  className: '',
  type: TYPE_TEXT,
  format: 'string',
  mode: Mode.DEFAULT,
  message: null,
  value: '',
  disabled: false,
};

export default Search;
