
import { getItem, selectItem, selectInFormProcess, resetItemAction } from '@modules/admin-attributes';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';
import Spinner from './Spinner';


export default function({ data }) {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);
  const inFormProcess = useSelector(selectInFormProcess);

  useMount(async () => {
    if (data && data['id']) {
      await dispatch(getItem(data['id']));
    }
  });

  useUnmount(() => {
    dispatch(resetItemAction());
  });

  return inFormProcess
    ? <Spinner />
    : <Form initialValues={item} />;
}
