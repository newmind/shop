
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Page';

  static propTypes = {
    children: PropTypes.node,
    inProcess: PropTypes.bool,
  };

  static defaultProps = {
    inProcess: false,
  };

  render() {
    const { children, inProcess } = this.props;

    const pageContentClassName = cn(styles['page__content'], {
      [styles['page--blur']]: inProcess,
    });

    return (
      <div className={styles['page']}>
        <div className={pageContentClassName}>
          { children }
        </div>
        {inProcess && (
          <div className={styles['loading']}>
            <div className={styles['container']}>
              <span className={styles['logotype']}>
                <i className={cn('fas fa-glasses', styles['logotype__icon'])} />
                <span className={styles['logotype__text']}>Магазин очков</span>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Component;
