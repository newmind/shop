
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brand: !! data['brands'].length ? data['brands'][0]['value'] : null,
    name: data['name'],
    types: data['types'],
    categories: data['categories'],
    description: data['description'],
    amount: Number(data['amount']),
    promotions: data['promotions'],
    currency: data['currency'] ? data['currency']['value'] : null,
    status: Number(data['status']),
    gallery: data['gallery'].map((img) => img['uuid']),
    comments: data['comments'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => ({
      name: item['attribute']['value'],
      value: item['value'],
      unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
    })),
  };
}
