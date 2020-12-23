
import { ApplicationContext } from '@ui.packages/application';

import types from "prop-types";
import React, { useContext } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

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

function Composite({ children }) {
  const location = useLocation();
  const { navigate } = useContext(ApplicationContext);

  console.log(navigate)

  const newNavigate = compositeNavigate(navigate, location);

  console.log(newNavigate)

  return (
    <Wrapper className={styles['wrapper']} navigate={navigate}>
      <section className={styles['page']}>
        <aside className={styles['aside']}>
          <Navigation items={navigate} />
        </aside>
        <article className={styles['content']}>
          { children }
        </article>
      </section>
    </Wrapper>
  );
}

Composite.propTypes = {
  children: types.node,
  location: types.object,
};

export default Composite;
