
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import cn from "classnames";
import styles from "./default.module.scss";


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';



class FieldComponent extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.any,
    disabled: types.bool,
    message: types.string,
    onChange: types.func,
    onInput: types.func,
  };

  static defaultProps = {
    className: '',
    type: 'text',
    mode: 'default',
    label: null,
    message: null,
    value: '',
    disabled: false,
  };

  _handleChange(value) {
    const { onChange, input } = this.props;
    if ('onChange' in input) {
      input.onChange(value);
    }
    onChange && onChange(value);
  }

  render() {
    const { input, label, disabled, message, meta: { touched, error, warning }, children, ...props} = this.props;
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
        <div ref={this.containerRef} className={styles['container']}>
          {React.cloneElement(children, {
            ...props,
            ...input,
            disabled,
            mode: mode,
            className: hasError ? styles['border-right-bottom-none'] : '',
            onChange: this._handleChange.bind(this),
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
}


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    label: types.string,
  };

  render() {
    const { children, ...props } = this.props;
    return (
      <Field {...props} component={FieldComponent}>
        { children }
      </Field>
    );
  }
}

export default Component;
