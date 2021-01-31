
export default function productBuilder(data) {
  console.log(data)
  return {
    uuid: data['uuid'],
    brand: data['brand'],
    name: data['name'],
    amount: data['amount'],
    saleAmount: data['saleAmount'] || 0,
    description: data['description'],
    params: data['params'],
    category: data['category'],
    type: data['type'],
    currency: data['currency']['value'],
    comments: data['comments'],
    gallery: data['gallery'].map((item) => item['uuid']),
    attributes: data['attributes'].map((item) => {
      return {
        name: item['value'],
        value: item['attribute']['value'],
        unit: item['unit'] ? item['unit']['value'] : null,
      };
    }),
  };
}
