
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    fiscal: data['fiscal'],
    name: data['name'],
    brand: !! data['brands'].length
      ? ({
        id: data['brands'][0]['id'],
        name: data['brands'][0]['value'],
      })
      : null,
    types: data['types'].map((item) => ({
      id: item['id'],
      name: item['value'],
    })),
    categories: data['categories'].map((item) => ({
      id: item['id'],
      name: item['value'],
    })),
    description: data['description'],
    price: Number(data['price']),
    promotions: data['promotions'],
    currency: data['currency']
      ? ({
        code: data['currency']['code'],
        name: data['currency']['value'],
      })
      : null,
    gallery: data['gallery'],
    comments: data['comments'],
    isView: data['isView'],
    updatedAt: data['updatedAt'],
    attributes: data['attributes'].map((item) => ({
      id: item['attribute']['id'],
      use: item['use'],
      name: item['attribute']['value'],
      value: item['value'],
      unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
    })),
  };
}
