
import { selectInProcess } from '@modules/admin-shop';

import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import { submit } from 'redux-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormModify from "./FormModify";

import styles from './default.module.scss';


function Shop() {
  const dispatch = useDispatch();

  const params = useParams();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    dispatch(submit('shop-modify'));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_SUCCESS}
            disabled={inProcess}
            onClick={() => handleCreate()}
          >{params['uuid'] ? 'Обновить' : 'Сохранить'}</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>{params['uuid'] ? 'Редактирование магазина' : 'Добавление магазина'}</Header>
          </div>
          <article className={styles['content']}>
            <FormModify />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Shop.propTypes = {};

Shop.defaultProps = {};

export default Shop;
