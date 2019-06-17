'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/utils";


const API_CURRENCIES_SERVER = process.env['API_CURRENCIES_SERVER'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${API_CURRENCIES_SERVER}`,
    data: formData,
  });

  return data;
};