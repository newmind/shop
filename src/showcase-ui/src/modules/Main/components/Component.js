
// import types from 'prop-types';
import React, { PureComponent } from 'react';

// import numeral from '@packages/numeral';
import { Row, Col } from '@packages/ui';

// import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <div className={styles['categories']} />
        <Row>
          <Col><div className={styles['category']} /></Col>
          <Col><div className={styles['category']} /></Col>
          <Col><div className={styles['category']} /></Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col><div className={styles['category']} /></Col>
          <Col><div className={styles['category']} /></Col>
          <Col><div className={styles['category']} /></Col>
          <Col><div className={styles['category']} /></Col>
        </Row>
      </div>
    );
  }
}

export default Component;
