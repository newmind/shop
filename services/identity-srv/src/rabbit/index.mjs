
import { connection } from "@sys.packages/rabbit2";


export default async function() {
  await connection(process.env['RABBIT_CONNECTION_HOST']);

}
