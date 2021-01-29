
import { connection } from "@sys.packages/rabbit2";

import attributes from './attributes';
import categories from './categories';


export default async function rabbitInit() {

  await connection(process.env['RABBIT_CONNECTION_HOST']);

  await attributes();
  await categories();
}
