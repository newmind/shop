
import PropTypes from 'prop-types';
import React, { cloneElement, PureComponent,  } from 'react';

import { sleep } from '@ui.packages/utils';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    inProcess: PropTypes.bool,
  };

  static defaultProps = {
    inProcess: false,
  };

  async changeState(state = true) {
    const { setPage } = this.props;
    await sleep(400);
    setPage && setPage(state);
  }

  render() {
    const { children, inProcess } = this.props;
    const child = children && cloneElement(children, {
      onLoading: this.changeState.bind(this)
    });
    const pageClassName = cn(styles['page'], {
      [styles['page--blur']]: inProcess,
    });
    return (
      <div className={pageClassName}>
        <div className={styles['page__content']}>{ child }</div>
        {inProcess && (
          <div className={styles['page__loading']}>
            <span className={styles['page__spinner']}>Загрузка</span>
          </div>
        )}
      </div>
    );
  }
}

export default Component;
