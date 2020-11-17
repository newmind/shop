
import types from 'prop-types';
import { Field } from 'redux-form';
import React, { useRef } from 'react';

import cn from "classnames";
import styles from "./default.module.scss";


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function FieldComponent({ input, label, disabled, message, meta: { touched, error, warning }, children, onChange, ...props }) {
  function handleChange(value) {
    if ('onChange' in input) {
      input.onChange(value);
    }
    onChange && onChange(value);
  }

  let mode = 'default';

  if (touched && (error || message)) {
    mode = 'danger';
  }

  if (touched && warning) {
    mode = 'warning';
  }

  const hasError = ! disabled && (error || message) && touched;
  const classNameInputWrapper = cn(styles['wrapper'], {
    [styles['wrapper--primary']]: mode === PRIMARY_MODE,
    [styles['wrapper--success']]: mode === SUCCESS_MODE,
    [styles['wrapper--info']]: mode === INFO_MODE,
    [styles['wrapper--danger']]: mode === DANGER_MODE,
    [styles['wrapper--warning']]: mode === WARNING_MODE,
    [styles['wrapper--disabled']]: disabled,
  });

  return (
    <div className={classNameInputWrapper}>
      {label && (
        <p className={styles['label']}>{ label }</p>
      )}
      <div className={styles['container']}>
        {React.cloneElement(children, {
          ...props,
          ...input,
          disabled,
          mode: mode,
          className: hasError ? styles['border-right-bottom-none'] : '',
          onChange: handleChange,
        })}
        {hasError && (
          <span className={styles['error']}>
            <span className={styles['error__message']}>{ message || error }</span>
          </span>
        )}
      </div>
    </div>
  );
}


function BaseField({ children, ...props }) {

 return (
    <Field {...props} component={FieldComponent}>
      { children }
    </Field>
  );
}

BaseField.propTypes = {
  name: types.string,
  label: types.string,
};

export default BaseField;
