
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    amount: Number(data['amount']),
    brand: data['brand'],
    categories: data['categories'].map(item => item['id']),
    colors: data['colors'].map(item => item['id']),
    currencyId: data['currency'] ? data['currency']['uuid'] : null,
    description: data['description'],
    forms: data['forms'].map(item => item['id']),
    materials: data['materials'].map(item => item['id']),
    name: data['name'],
    params: data['params'],
    saleAmount: Number(data['saleAmount']),
    status: Number(data['status']),
    types: data['types'].map(item => item['id']),
    gallery: data['gallery'].map(img => img['externalId']),
    comments: data['comments'],
    attributes: data['attributes'].map((item) => {
      return {
        id: item['id'],
        name: item['name'],
        value: item['value'],
        unitId: item['unit'] ? item['unit']['id'] : null,
      };
    }),
  };
}
