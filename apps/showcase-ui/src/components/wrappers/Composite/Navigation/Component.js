
import React, { PureComponent } from 'react';
import { Link, matchPath } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Navigation';

  render() {
    const { items, location }  = this.props;

    return (
      <nav className={styles['navigate']}>
        {items.map((item, index) => {
          const match = matchPath(item['path'], location['pathname']);
          const itemClassName = cn(styles['navigate__item'], {
            [styles['navigate__item--active']]: match && match['isExact'],
          });
          return (
            <span key={index} className={itemClassName}>
              <Link to={item['path']} className={styles['navigate__link']}>
                <span className={styles['navigate__text']}>{item['title']}</span>
              </Link>
            </span>
          );
        })}
      </nav>
    );
  }
}

export default Component;
