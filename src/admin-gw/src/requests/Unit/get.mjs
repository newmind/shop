'use strict';

import axios from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async () => {
  try {

    const { data } = await axios({
      method: 'get',
      url: `${PRODUCT_API_SRV}/units`,
    });

    return data;

  } catch (error) {

    console.log(error);
  }
};
