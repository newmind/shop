
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { items, match }  = this.props;
    return (
      <nav className={styles['navigate']}>
        {items.map((item, index) => {

          let matching = null;
          let hasPath = false;

          const matchPath = match['url'].replace(/^\/|\/$/, '') || '/';

          if ('navigate' in item) {
            hasPath = item['navigate'].some(item => {
              const navPath = item['path'].replace(/^\/|\/$/, '') || '/';
              const regExp = new RegExp('^' + navPath);
              return regExp.test(matchPath);
            });
          }

          if ( ! hasPath) {
            const navPath = item['path'].replace(/^\/|\/$/, '') || '/';
            const regExp = new RegExp('^' + navPath);
            matching = regExp.test(matchPath);
          }

          const itemClassName = cn(styles['navigate__item'], {
            [styles['navigate__item--active']]: hasPath || matching,
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
