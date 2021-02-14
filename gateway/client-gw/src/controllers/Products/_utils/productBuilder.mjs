
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    brand: !! data['brands'].length ? data['brands'][0]['value'] : null,
    name: data['name'],
    price: data['price'],
    prevPrice: data['prevPrice'] || null,
    description: data['description'],
    params: data['params'],
    category: data['category'],
    type: data['type'],
    currency: data['currency']['value'],
    comments: data['comments'],
    gallery: data['gallery'].map((item) => item['uuid']),
    attributes: data['attributes'].map((item) => {
      return {
        name: item['attribute']['value'],
        value: item['value'],
        unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
      };
    }),
  };
}
