
export default function productBuilder(data) {
  console.log(data)
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
    price: Number(data['prevPrice'] || data['price']),
    promotions: data['promotions'].map((promotion) => promotion['id']),
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
    characteristics: data['characteristics'].map((characteristic) => {
      return {
        id: characteristic['id'],
        name: characteristic['name'],
        order: characteristic['order'],
        attributes: characteristic['attributes'].map((item) => ({
          id: item['attribute']['id'],
          use: item['use'],
          name: item['attribute']['value'],
          value: item['value'],
          unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
        })),
      };
    }),
  };
}
