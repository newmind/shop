
import types from "prop-types";
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
    const classNameWrapper = cn(styles['container'], className);
    return (
      <span className={classNameWrapper}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {});
        })}
      </span>
    );
  }
}

export default Component;
