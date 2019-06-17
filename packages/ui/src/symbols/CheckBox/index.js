
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
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    disabled: types.bool,
    value: types.bool,
    onChange: types.func,
  };

  static defaultProps = {
    mode: 'default',
    disabled: false,
    value: false,
  };

  _handleClick() {
    const { value, onChange } = this.props;
    onChange && onChange(value);
  }

  render() {
    const { className, disabled, mode, value } = this.props;
    const classNameButton = cn(className, styles['checkbox'], {
      [styles['checkbox--primary']]: mode === PRIMARY_MODE,
      [styles['checkbox--success']]: mode === SUCCESS_MODE,
      [styles['checkbox--info']]: mode === INFO_MODE,
      [styles['checkbox--danger']]: mode === DANGER_MODE,
      [styles['checkbox--warning']]: mode === WARNING_MODE,
      [styles['checkbox--disabled']]: disabled,
      [styles['checkbox--checked']]: value,
    });
    return (
      <span className={classNameButton} onClick={this._handleClick.bind(this)}>
        <span className={cn(styles['checkbox__marker'], 'fas fa-check')} />
      </span>
    );
  }
}

export default Component;
