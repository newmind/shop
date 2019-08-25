
import PropTypes from 'prop-types';
import React, { cloneElement, PureComponent,  } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    inProcess: PropTypes.bool,
    setProcess: PropTypes.func,
  };

  static defaultProps = {
    inProcess: false,
  };

  changeState(state = true) {
    const { setProcess } = this.props;
    setProcess(state);
  }

  render() {
    const { children } = this.props;
    const child = children && cloneElement(children, {
      onLoading: this.changeState.bind(this)
    });
    return (
      <div className={styles['page']}>{ child }</div>
    );
  }
}

export default Component;
