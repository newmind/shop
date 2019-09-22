
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    inProcess: PropTypes.bool,
  };

  static defaultProps = {
    inProcess: false,
  };

  changeState(state = true) {
    const { setProcess } = this.props;
    setProcess(state);
  }

  render() {
    const { children, inProcess } = this.props;
    return (
      <div className={styles['page']}>
        <div className={styles['page__content']}>{ children }</div>
        {inProcess && (
          <div className={styles['loading']}>
            <span className={styles['spinner']}>Загрузка...</span>
          </div>
        )}
      </div>
    );
  }
}

export default Component;
