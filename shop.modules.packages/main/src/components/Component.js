
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
      <section className={styles['wrapper']}>
        <div className={styles['content']}>
          <article className={styles['types']}>
            <Suspense fallback={null}>
              <Types />
            </Suspense>
          </article>
          <article className={styles['categories']}>
            <Suspense fallback={null}>
              <Categories />
            </Suspense>
          </article>
          <article className={styles['sign-up']}>
            <Row>
              <Col>
                <Suspense fallback={null}>
                  <SignUp />
                </Suspense>
              </Col>
              <Col>
                <Suspense fallback={null}>
                  <Profile />
                </Suspense>
              </Col>
            </Row>
          </article>
        </div>
      </section>
    );
  }
}

export default Component;
