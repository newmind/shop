
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <span className={cn(className, styles['row'])}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            ...props
          });
        })}
      </span>
    );
  }
}

export default Component;
