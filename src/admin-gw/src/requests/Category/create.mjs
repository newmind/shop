'use strict';

import axios from 'axios';

// import { getBuffer } from "@sys.packages/sys.utils";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${PRODUCT_API_SRV}/category`,
    data: formData,
  });

  return data;
};