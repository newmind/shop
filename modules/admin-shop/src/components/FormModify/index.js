
import { selectItem, selectPayments, selectDeliveries, updateShop, createShop } from '@modules/admin-shop';

import { UUID } from '@ui.packages/utils';

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Form from './Form';


function FormModify() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const item = useSelector(selectItem);
  const payments = useSelector(selectPayments);
  const deliveries = useSelector(selectDeliveries);

  const paymentsNormalize = useMemo(() => payments.map((item) => ({ name: item['name'], code: item['code'], status: item['status'] || true })), [payments]);
  const deliveriesNormalize = useMemo(() => deliveries.map((item) => ({ name: item['name'], code: item['code'], status: item['status'] || true })), [deliveries]);

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
        payments: paymentsNormalize,
        deliveries: deliveriesNormalize,
        ...item,
      }}
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}

export default FormModify;
