
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    amount: Number(data['amount']),
    brand: data['brand'],
    categoryId: data['category'] ? Number(data['category']['id']) : null,
    colorId: data['color'] ? Number(data['color']['id']) : null,
    count: Number(data['count']),
    currencyId: data['currency'] ? data['currency']['uuid'] : null,
    description: data['description'],
    formId: data['form'] ? Number(data['form']['id']) : null,
    materialId: data['material'] ? Number(data['material']['id']) : null,
    name: data['name'],
    params: data['params'],
    saleAmount: Number(data['saleAmount']),
    status: Number(data['status']),
    typeId: data['type'] ? Number(data['type']['id']) : null,
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
