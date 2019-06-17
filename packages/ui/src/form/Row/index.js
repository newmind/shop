
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <span className={styles['row']}>
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
