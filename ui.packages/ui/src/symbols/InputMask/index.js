
import types from 'prop-types';
import React, { Component as PureComponent } from 'react';
import MaskedInput from 'react-input-mask';

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
    mask: types.string,
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
    mask: '',
    mode: 'default',
    label: null,
    message: null,
    value: '',
    disabled: false,
  };

  static changeTransform(value) {
    return value.replace(/[-\s_()]+/g, '');
  }

  state = {
    isFocus: false,
  };

  _handleFocus = (event) => {
    const { onFocus } = this.props;
    const { value } = event['target'];

    event.stopPropagation();

    onFocus && onFocus(Component.changeTransform(value));
    this.setState({ isFocus: true });
  };

  _handleBlur = (event) => {
    const { onBlur } = this.props;
    const { value } = event['target'];

    event.stopPropagation();

    onBlur && onBlur(Component.changeTransform(value));
    this.setState({ isFocus: false });
  };

  _handleChange(event) {
    const { onChange } = this.props;
    const { value } = event['target'];

    event.stopPropagation();

    onChange && onChange(Component.changeTransform(value));
  }

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
        <MaskedInput
          className={styles['input']}
          disabled={disabled}
          maskPlaceholder={'_'}
          alwaysShowMask={false}
          {...props}
          onFocus={this._handleFocus.bind(this)}
          onBlur={this._handleBlur.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
