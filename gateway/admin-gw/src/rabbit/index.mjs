
import { connection } from "@sys.packages/rabbit2";

import attributes from './attributes';
import categories from './categories';
import types from './types';
import units from './units';
import products from './products';


export default async function rabbitInit() {

  await connection(process.env['RABBIT_CONNECTION_HOST']);

  await attributes();
  await categories();
  await types();
  await units();
  await products();
}
