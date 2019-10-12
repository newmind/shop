
import types from 'prop-types';
import React, { PureComponent } from 'react';

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
      <div className={styles['container']}>
        { React.Children.map(children, (child, key) => React.cloneElement(child, { key, value })) }
      </div>
    );
  }
}

export default Component;
export { default as Radio } from './RadioComponent';