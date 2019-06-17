
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
    value: types.oneOf([0, 1, 2, 3, 4, 5]),
  };

  static defaultProps = {
    className: '',
    mode: 'default',
    value: 0,
  };

  _handleClick(index) {
    const { onChange } = this.props;
    onChange && onChange(index);
  }

  render() {
    const { className, mode, value } = this.props;
    const classNameEvaluation = cn(className, styles['evaluation'], {
      [styles['evaluation--primary']]: mode === PRIMARY_MODE,
      [styles['evaluation--success']]: mode === SUCCESS_MODE,
      [styles['evaluation--info']]: mode === INFO_MODE,
      [styles['evaluation--danger']]: mode === DANGER_MODE,
      [styles['evaluation--warning']]: mode === WARNING_MODE,
    });
    return (
      <div className={classNameEvaluation}>
        <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 1, 'far fa-star': value < 1 })} onClick={this._handleClick.bind(this, 1)} />
        <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 2, 'far fa-star': value < 2 })} onClick={this._handleClick.bind(this, 2)} />
        <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 3, 'far fa-star': value < 3 })} onClick={this._handleClick.bind(this, 3)} />
        <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 4, 'far fa-star': value < 4 })} onClick={this._handleClick.bind(this, 4)} />
        <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 5, 'far fa-star': value < 5 })} onClick={this._handleClick.bind(this, 5)} />
      </div>
    );
  }
}

export default Component;
