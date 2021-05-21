
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, product) {
  const { Product } = models;

  await Product.create({
    ...product,
    uuid,
    currencyCode: product['currency']['code'],
  });
}
