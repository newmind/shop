
import React, { PureComponent } from 'react';

import Wrapper from '../Navigate';
import Navigation from './Navigation';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children, navigate, match }  = this.props;
    const compositeNavigate = navigate.find(item => {
      let hasPath = false;

      if ('navigate' in item) {
        hasPath = item['navigate'].some(item => {
          const navPath = item['path'].replace(/^\/|\/$/, '') || '/';
          const matchPath = match['url'].replace(/^\/|\/$/, '') || '/';
          const regExp = new RegExp('^' + navPath);

          return regExp.test(matchPath);
        });
      }

      return hasPath;
    });
    return (
      <Wrapper className={styles['wrapper']} navigate={navigate}>
        <section className={styles['page']}>
          <aside className={styles['aside']}>
            <Navigation items={compositeNavigate ? compositeNavigate['navigate'] : []} />
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
