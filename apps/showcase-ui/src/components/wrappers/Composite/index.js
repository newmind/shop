
import types from "prop-types";
import { matchPath } from 'react-router-dom';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Wrapper = lazy(() => import(/* webpackChunkName: "wrapper.composite.wrapper" */'../Navigate'));
const Navigation = lazy(() => import(/* webpackChunkName: "wrapper.composite.navigate" */'./Navigation'));


const compositeNavigate = (navigate, location) => navigate.find(item => {
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

class Component extends PureComponent {
  static propTypes = {
    children: types.node,
    location: types.object,
  };

  static contextTypes = {
    navigate: types.array,
  };

  render() {
    const { children, location }  = this.props;
    const { navigate } = this.context;

    const newNavigate = compositeNavigate(navigate, location);

    return (
      <Suspense fallback={null}>
        <Wrapper className={styles['wrapper']} navigate={navigate}>
          <section className={styles['page']}>
            <aside className={styles['aside']}>
              <Navigation items={newNavigate['navigate']} />
            </aside>
            <article className={styles['content']}>
              { children }
            </article>
          </section>
        </Wrapper>
      </Suspense>
    );
  }
}

export default Component;
