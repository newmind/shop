
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
    type: !! data['types'].length
      ? ({
        id: data['types'][0]['id'],
        name: data['types'][0]['value'],
      })
      : null,
    category: !! data['categories'].length
      ? ({
        id: data['categories'][0]['id'],
        name: data['categories'][0]['value'],
      })
      : null,
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
    characteristics: data['characteristics'].map((characteristic) => ({
      ...characteristic,
      attributes: characteristic['attributes'].map((item) => ({
        id: item['attribute']['id'],
        use: item['use'],
        name: item['attribute']['value'],
        value: item['value'],
        unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
      })),
    })),
  };
}
