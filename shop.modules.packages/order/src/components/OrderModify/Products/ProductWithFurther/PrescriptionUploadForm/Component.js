
import { Container, Row, Col, Button } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function PrescriptionUploadForm({ onNext }) {
  function handleNext() {
    onNext('select-lenses');
  }

  return (
    <Container className={styles['container']}>
      <Row>
        <Col className={styles['content']}>

        </Col>
      </Row>
      <Row>
        <Col className={styles['controls']}>
          <Button mode="primary" onClick={() => handleNext()}>Далее</Button>
          <Button mode="success">Готово</Button>
        </Col>
      </Row>
    </Container>
  );
}

PrescriptionUploadForm.propTypes = {
  onNext: types.func,
  onSubmit: types.func,
};

export default PrescriptionUploadForm;
