
import React, { PureComponent } from 'react';
import { matchPath } from 'react-router-dom';

import Wrapper from '../Navigate';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, navigate, location }  = this.props;
    const compositeNavigate = navigate.find(item => {
      let hasPath = false;
      let mainPath = location['pathname'];

      if ('navigate' in item) {
        hasPath = item['navigate'].some(item => {
          const match = matchPath(item['path'], mainPath);
          return match ? match['isExact'] : false;
        });
      }

      return hasPath;
    });
    return (
      <Wrapper className={styles['wrapper']} navigate={navigate}>
        <section className={styles['page']}>
          <aside className={styles['aside']}>
            <Navigation items={compositeNavigate['navigate']} />
          </aside>
          <article className={styles['content']}>
            { children }
          </article>
        </section>
      </Wrapper>
    );
  }
}

export default Component;
