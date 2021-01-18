
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    amount: Number(data['amount']),
    brand: data['brand'],
    categories: data['categories'],
    colors: data['colors'],
    count: Number(data['count']),
    currencyId: data['currency'] ? data['currency']['uuid'] : null,
    description: data['description'],
    forms: data['forms'],
    materials: data['materials'],
    name: data['name'],
    params: data['params'],
    saleAmount: Number(data['saleAmount']),
    status: Number(data['status']),
    types: data['types'],
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
