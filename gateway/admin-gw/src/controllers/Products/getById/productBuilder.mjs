
export default function productBuilder(data) {
  console.log(data)

  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brandId: !! data['brands'].length ? data['brands'][0]['id'] : null,
    name: data['name'],
    types: data['types'].map((item) => item['id']),
    categories: data['categories'].map((item) => item['id']),
    description: data['description'],
    price: Number(data['price']),
    promotions: data['promotions'],
    currencyCode: data['currency'] ? data['currency']['code'] : null,
    gallery: data['gallery'],
    isView: data['isView'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => {
      return {
        id: item['attribute']['id'],
        use: item['use'],
        value: item['value'],
        unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
      }
    }),
  };
}
