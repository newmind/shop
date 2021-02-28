
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    brand: !! data['brands'].length ? data['brands'][0]['value'] : null,
    name: data['name'],
    types: data['types'],
    categories: data['categories'],
    description: data['description'],
    price: Number(data['price']),
    promotions: data['promotions'],
    currency: data['currency'] ? data['currency']['value'] : null,
    gallery: data['gallery'],
    comments: data['comments'],
    isView: data['isView'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => {
      return {
        name: item['attribute']['value'],
        value: item['value'],
        unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
      }
    }),
  };
}
