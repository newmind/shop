
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <span className={cn(styles['hr'], className)} />
    );
  }
}

export default Component;
