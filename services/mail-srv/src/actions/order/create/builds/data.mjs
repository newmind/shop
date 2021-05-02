
export default function(data) {
  return {
    externalId: data['externalId'],
    price: data['price'],
    currency: data['currency']['value'],
    paymentLink: data['paymentLink'],
    name: data['name'],
    email: data['meta']['email'],
    address: data['meta']['address'],
  };
}