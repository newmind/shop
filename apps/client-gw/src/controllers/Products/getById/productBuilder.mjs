
export default function(data) {
  console.log(data)
  return {
    uuid: data['uuid'],
    brand: data['brand'],
    name: data['name'],
    amount: data['amount'],
    saleAmount: data['saleAmount'] || 0,
    description: data['description'],
    params: data['params'],
    createdAt: data['createdAt'],
    category: data['category'],
    type: data['type'],
    material: data['material'],
    color: data['color'],
    form: data['form'],
    currency: data['currency'],
    comments: data['comments'],
    attributes: data['attributes'],
    gallery: data['gallery'].map((item) => item['externalId']),
  };
}
