
export default function productBuilder(data) {
  console.log(data)
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brandId: !! data['brands'].length ? data['brands'][0]['id'] : null,
    name: data['name'],
    types: data['types'].map((item) => item['id']),
    categories: data['categories'].map((category) => category['id']),
    description: data['description'],
    price: Number(data['price']),
    saleAmount: Number(data['saleAmount']),
    currencyCode: data['currency'] ? data['currency']['code'] : null,
    status: Number(data['status']),
    gallery: data['gallery'].map((img) => img['uuid']),
    comments: data['comments'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => ({
      id: item['attribute']['id'],
      value: item['value'],
      unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,

    })),
  };
}
