
import { Row, Col, InputField, TextareaField } from '@ui.packages/kit';

import React from 'react';


function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField
            name={'name'}
            label={'Наименование'}
          />
        </Col>
        <Col>
          <InputField
            name={'address'}
            label={'Адресс'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextareaField
            name={'description'}
            label={'Описание'}
          />
        </Col>
      </Row>
    </form>
  );
}

export default Form;
