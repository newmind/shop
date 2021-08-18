
import { Row, Col, Header, InputField, TextareaField, CheckBoxField } from '@ui.packages/kit';

import React from 'react';
import { FieldArray } from 'redux-form';


function Delivery({ name, field }) {
  return (
    <div>
      <CheckBoxField name={field} />
      <span>{ name }</span>
    </div>
  );
}

function Deliveries({ fields }) {
  return fields.map((field, index) => (
    <Delivery key={index} field={field + '.status'} {...fields.get(index)} />
  ));
}

function Payment({ name, field }) {
  return (
    <div>
      <CheckBoxField name={field} />
      <span>{ name }</span>
    </div>
  );
}

function Payments({ fields }) {
  return fields.map((field, index) => (
    <Payment key={index} field={field + '.status'} {...fields.get(index)} />
  ));
}


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
      <Row>
        <Col>
          <Header level={4}>Способы доставки</Header>
          <FieldArray name={'deliveries'} component={Deliveries} />
        </Col>
        <Col>
          <Header level={4}>Способы оплаты</Header>
          <FieldArray name={'payments'} component={Payments} />
        </Col>
      </Row>
    </form>
  );
}

export default Form;
