
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brand: data['brand'],
    name: data['name'],
    types: data['types'].map((item) => item['id']),
    categories: data['categories'].map((category) => category['id']),
    description: data['description'],
    amount: Number(data['amount']),
    saleAmount: Number(data['saleAmount']),
    currencyId: data['currency'] ? data['currency']['uuid'] : null,
    status: Number(data['status']),
    gallery: data['gallery'].map((img) => img['uuid']),
    comments: data['comments'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => ({
      id: item['attribute']['attributeId'],
      value: item['attribute']['value']
    })),
  };
}
