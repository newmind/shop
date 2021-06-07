
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    brand: !! data['brands'].length ? data['brands'][0]['value'] : null,
    name: data['name'],
    price: data['price'],
    option: data['options'][0],
    promotion: data['promotion'],
    gallery: data['gallery'].map((item) => item['uuid']),
  };
}
