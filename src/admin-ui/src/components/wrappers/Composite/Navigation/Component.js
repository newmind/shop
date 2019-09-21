
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

          const navPath = item['path'].replace(/^\/|\/$/, '') || '/';
          const matchPath = match['url'].replace(/^\/|\/$/, '') || '/';

          const regExp = new RegExp('^' + navPath);
          const matching = regExp.test(matchPath);

          const itemClassName = cn(styles['navigate__item'], {
            [styles['navigate__item--active']]: matching,
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
