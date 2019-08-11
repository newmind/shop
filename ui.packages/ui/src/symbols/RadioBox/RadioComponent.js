
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from "classnames";
import styles from "./default.module.scss";

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    label: types.string,
    mode: types.string,
    disabled: types.bool,
    className: types.string,
    value: types.any,
  };

  static defaultProps = {
    label: '',
    mode: '',
    disabled: false,
    className: '',
    name: '',
    value: '',
  };

  static contextTypes = {
    onChange: types.func,
  };

  _handleChange() {
    const { name } = this.props;
    const { onChange } = this.context;
    onChange(name);
  }

  render() {
    const { className, disabled, mode, label, name, value, children } = this.props;
    const classNameWrapper = cn(className, styles['wrapper']);
    const classNameRadio = cn(styles['radio'], {
      [styles['radio--primary']]: mode === PRIMARY_MODE,
      [styles['radio--success']]: mode === SUCCESS_MODE,
      [styles['radio--info']]: mode === INFO_MODE,
      [styles['radio--danger']]: mode === DANGER_MODE,
      [styles['radio--warning']]: mode === WARNING_MODE,
      [styles['radio--disabled']]: disabled,
    });
    const isSelected = (name === value);
    return children
      ? (
          React.Children.map(children, child => {
            return React.cloneElement(child, {
              selected: name === value,
              onClick: this._handleChange.bind(this, name)
            })
          })
        )
      : (
          <span className={classNameWrapper} onClick={this._handleChange.bind(this)}>
            <span className={classNameRadio}>
              {isSelected && <span className={cn(styles['radio__marker'])} />}
            </span>
            {label && <label className={styles['label']}>{ label }</label>}
          </span>
        );
  }
}

export default Component;
