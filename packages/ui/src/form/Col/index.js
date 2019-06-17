
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <span className={styles['col']}>
        {children && React.cloneElement(children, {
          ...props,
        })}
      </span>
    );
  }
}

export default Component;
