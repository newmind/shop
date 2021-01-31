
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brand: data['brand'],
    name: data['name'],
    types: data['types'],
    categories: data['categories'],
    description: data['description'],
    amount: Number(data['amount']),
    promotion: !! data['promotion'].length ? data['promotion'][0]['uuid'] : null,
    currency: data['currency'] ? data['currency']['value'] : null,
    status: Number(data['status']),
    gallery: data['gallery'].map((img) => img['uuid']),
    comments: data['comments'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => ({
      name: item['value'],
      value: item['attribute']['value'],
      unit: item['unit'] ? item['unit']['value'] : null,
    })),
  };
}
