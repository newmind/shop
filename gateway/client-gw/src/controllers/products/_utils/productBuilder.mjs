
import moment from '@packages/moment';


export default function productBuilder(data, filterAttributes) {
  return {
    uuid: data['uuid'],
    brand: !! data['brands'].length ? data['brands'][0] : null,
    name: data['name'],
    price: data['price'],
    prevPrice: data['prevPrice'] || null,
    description: data['description'],
    params: data['params'],
    category: !! data['categories'].length ? data['categories'][0] : null,
    type: !! data['types'].length ? data['types'][0] : null,
    currency: data['currency']['value'],
    comments: data['comments'],
    promotions: data['promotions'].filter((promo) => moment().isBetween(promo['dateFrom'], promo['dateTo'], undefined, '[]')),
    gallery: data['gallery'].map((item) => item['uuid']),
    characteristics: data['characteristics'].map((characteristic) => ({
      ...characteristic,
      attributes: filterAttributes
        ? characteristic['attributes'].filter((item) => item['use']).map((item) => {
          return {
            name: item['attribute']['value'],
            value: item['value'],
            unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
          };
        })
        : characteristic['attributes'].map((item) => {
          return {
            name: item['attribute']['value'],
            value: item['value'],
            unit: item['attribute']['unit'] ? item['attribute']['unit']['value'] : null,
          };
        }),
    })),
  };
}
