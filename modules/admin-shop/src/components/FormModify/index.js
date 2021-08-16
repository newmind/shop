
import { selectItem, updateShop, createShop } from '@modules/admin-shop';

import { UUID } from '@ui.packages/utils';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Form from './Form';


function FormModify() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const item = useSelector(selectItem);

  async function handleSubmit(data) {
    if (params['uuid']) {
      await dispatch(updateShop(data));
    }
    else {
      const isDone = await dispatch(createShop(data));

      if (isDone) {
        navigate(process.env['PUBLIC_URL'] + '/');
      }
    }
  }

  return (
    <Form
      initialValues={{
        uuid: UUID(),
        ...item,
      }}
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}

export default FormModify;
