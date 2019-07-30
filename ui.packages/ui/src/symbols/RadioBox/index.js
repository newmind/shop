
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    disabled: types.bool,
    value: types.any,
    onChange: types.func,
  };

  static defaultProps = {
    mode: 'default',
    disabled: false,
    value: false,
    label: null,
  };

  static childContextTypes = {
    value: types.any,
    onChange: types.func,
  };

  getChildContext() {
    return {
      onChange: this._handleClick.bind(this),
    };
  }

  _handleClick(value) {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const { children, value } = this.props;
    return (
      <div className={styles['wrapper']}>
        { React.Children.map(children, (child) => React.cloneElement(child, { value })) }
      </div>
    );
  }
}

export default Component;
export { default as Radio } from './RadioComponent';