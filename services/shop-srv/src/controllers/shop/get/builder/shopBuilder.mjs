
import paymentBuilder from './paymentBuilder.mjs';
import deliveryBuilder from './deliveryBuilder.mjs';


export default function(data) {
  return {
    uuid: data['uuid'],
    name: data['name'],
    address: data['address'],
    description: data['description'],
    payments: data['payments'].map((data) => paymentBuilder(data)),
    deliveries: data['deliveries'].map((data) => deliveryBuilder(data)),
    updatedAt: data['updatedAt'],
  };
}