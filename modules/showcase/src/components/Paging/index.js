
import { Paging } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import { selectMeta } from '../../ducks/slice';


export default function Pagination() {
  const meta = useSelector(selectMeta);

  return (
    <Paging skip={12} total={meta['total']} />
  );
}

Pagination.propTypes = {};

Pagination.defaultProps = {};
