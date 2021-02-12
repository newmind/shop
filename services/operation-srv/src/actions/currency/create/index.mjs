
import { models } from '@sys.packages/db';

export default async function (data) {
  const { Currency } = models;

  await Currency.create(data);
}