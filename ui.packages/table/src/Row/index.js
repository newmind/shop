
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
  };

  static defaultProps = {
    data: null,
  };

  render() {
    const { children, data } = this.props;

    return (
      <tbody className={styles['row']}>
        <tr className={styles['line']}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              _model: data
            });
          })}
        </tr>
      </tbody>
    );
  }
}


export default Component;