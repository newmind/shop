
import types from "prop-types";
import { matchPath } from 'react-router-dom';
import React, { PureComponent } from 'react';

import Wrapper from '../Navigate';
import Navigation from './Navigation';

import styles from './default.module.scss';


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
  static displayName = 'Wrapper Composite';

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
    );
  }
}

export default Component;
