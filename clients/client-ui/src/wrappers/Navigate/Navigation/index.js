
import { Context  } from "@ui.packages/application";

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


function HomeLink() {
  const location = useLocation();

  const mainPath = location['pathname'];
  const itemClassName = cn(styles['navigate__home'], {
    [styles['navigate__item--active']]: mainPath === '/',
  });

  return (
    <span className={itemClassName}>
      <Link to={'/'} className={styles['navigate__home-link']}>
        <span className={cn(styles['navigate__home-text'], "fas fa-home")} />
      </Link>
    </span>
  );
}

function Navigation() {
  const location = useLocation();
  const { navigate } = useContext(Context);

  return (
    <nav role="navigation" className={styles['navigate']}>
      <HomeLink location={location} />
      {navigate.map((item, index) => {

        let match = null;
        let hasPath = false;
        let mainPath = location['pathname'];

        if ('navigate' in item) {
          hasPath = item['navigate'].some(item => {
            const regExp = new RegExp(item['path']);
            match = regExp.test(mainPath);
            return match;
          });
        }

        if ( ! hasPath) {
          const regExp = new RegExp(item['path']);
          match = regExp.test(mainPath);
        }

        const itemClassName = cn(styles['navigate__item'], {
          [styles['navigate__item--active']]: hasPath || match,
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

export default Navigation;
