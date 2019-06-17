'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/utils";


const API_CATEGORY_SERVER = process.env['API_CATEGORY_SERVER'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${API_CATEGORY_SERVER}`,
    data: formData,
  });

  return data;
};