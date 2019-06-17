
import React, { PureComponent } from 'react';

import AddImageForm from '../AddImageForm';
import AttrsForm from '../AttributesForm';

import { Field, FieldArray } from 'redux-form';
import { Row, Col, Hr, InputField, TextariaField } from '@packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className={styles['wrapper']} onSubmit={handleSubmit}>
        <div className={styles['form']}>
          <Row>
            <Col>
              <h3 className="header-3">Изображения</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Field name="gallery" path={`${process.env['REACT_APP_API_HOST']}/gallery`} component={AddImageForm}/>
            </Col>
          </Row>
          <Hr className={styles['delimiter']} />
          <Row>
            <Col>
              <h3 className="header-3">Основные аттрибуты</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField name="name" label="Назвние" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField name="brand" label="Производитель" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextariaField name="description" label="Описание" />
            </Col>
          </Row>
          <Hr className={styles['delimiter']} />
          <Row>
            <Col>
              <h3 className="header-3">Дополнительные аттрибуты</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <FieldArray name="attributes" component={AttrsForm} />
            </Col>
          </Row>
        </div>
      </form>
    );
  }
}

export default Component;
