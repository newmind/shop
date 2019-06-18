'use strict';

import axios from 'axios';

// import { getBuffer } from "@packages/sys.utils";


const API_CURRENCIES_SERVER = process.env['API_CURRENCIES_SERVER'];


export default async (id, formData) => {

  const { data } = await axios({
    method: 'put',
    url: `${API_CURRENCIES_SERVER}/${id}`,
    data: formData,
  });

  return data;
};
