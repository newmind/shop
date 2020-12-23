
import { Row, Col, Button, InputField, TextareaField, FileField } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine, hasImage }) => {
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="value"
              label="Значение"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
            />
          </Col>
        </Row>
        {hasImage && (
          <Row>
            <Col>
              <FileField
                label="Изображение"
                name="file"
              />
            </Col>
          </Row>
        )}
      </div>
      <div className={styles['controls']}>
        <Button
          type="submit"
          mode="success"
          disabled={ ! valid || pristine}
        >Выполнить</Button>
      </div>
    </form>
  )
};
