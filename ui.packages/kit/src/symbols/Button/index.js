
import types from 'prop-types';
import { Link } from 'react-router-dom';
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
    href: types.string,
    type: types.oneOf(['button', 'submit', 'link']),
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    size: types.oneOf(['s', 'm', 'l']),
    caption: types.string,
    children: types.any,
    disabled: types.bool,
    onClick: types.func,
  };

  static defaultProps = {
    href: '#',
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
    const { type, href, className, caption, children, disabled, mode, size } = this.props;

    const classNameButton = cn(className, styles['button'], {
      [styles['button--primary']]: mode === PRIMARY_MODE,
      [styles['button--success']]: mode === SUCCESS_MODE,
      [styles['button--info']]: mode === INFO_MODE,
      [styles['button--danger']]: mode === DANGER_MODE,
      [styles['button--warning']]: mode === WARNING_MODE,
      [styles['button--disabled']]: disabled,
    }, {
      [styles['button--small']]: size === 's',
      [styles['button--large']]: size === 'l',
    });

    if (type === 'link') {
      return (
        <Link className={classNameButton} to={href}>{ caption || children }</Link>
      );
    }

    return (
      <button type={type} className={classNameButton} onClick={this._handleClick.bind(this)} disabled={disabled}>
        {caption || children}
      </button>
    );
  }
}

export default Component;
