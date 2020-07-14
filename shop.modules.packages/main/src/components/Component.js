
import { Row, Col } from '@ui.packages/kit';

import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Types = lazy(() => import('./Types'));
const Categories = lazy(() => import('./Categories'));
const SignUp = lazy(() => import('./SignUp'));
const Profile = lazy(() => import('./Profile'));


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Suspense fallback={null}>
        <section className={styles['wrapper']}>
          <div className={styles['content']}>
            <article className={styles['types']}>
              <Types />
            </article>
            <article className={styles['categories']}>
              <Categories />
            </article>
            <article className={styles['sign-up']}>
              <Row>
                <Col>
                  <SignUp />
                </Col>
                <Col>
                  <Profile />
                </Col>
              </Row>
            </article>
          </div>
        </section>
      </Suspense>
    );
  }
}

export default Component;
