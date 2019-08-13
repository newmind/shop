
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { children, className } = this.props;
    return (
      <span className={cn(styles['row'], className)}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {});
        })}
      </span>
    );
  }
}

export default Component;
