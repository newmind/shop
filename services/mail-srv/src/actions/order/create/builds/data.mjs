
import numeral from '@packages/numeral';


export default function(data) {
  return {
    domain: data['domain'],
    externalId: data['externalId'],
    price: numeral(data['price']).format(),
    currency: data['currency']['value'],
    paymentLink: data['paymentLink'],
    name: data['name'],
    email: data['meta']['email'],
    address: data['meta']['address'],
    products: data['products'].map((product) => ({
      uuid: product['uuid'],
      count: product['count'],
      price: numeral(product['price']).format(),
      finalPrice: numeral(product['count'] * product['price']).format(),
      currency: product['currency']['value'],
      name: product['name'],
      brand: product['brand'],
      preview: product['preview'],
      optionName: product['optionName'],
      optionVendor: product['optionVendor'],
    })),
  };
}