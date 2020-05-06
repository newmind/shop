
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
    const colClassName = cn(styles['col'], className);
    return (
      <span className={colClassName}>
        <span className={styles['wrapper']}>
          {children && React.Children.map(children, (child) => {
            return child && React.cloneElement(child, {});
          })}
        </span>
      </span>
    );
  }
}

export default Component;
