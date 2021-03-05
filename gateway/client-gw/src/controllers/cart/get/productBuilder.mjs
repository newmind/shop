
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    brand: !! data['brands'].length ? data['brands'][0]['value'] : null,
    name: data['name'],
    price: data['price'],
    gallery: data['gallery'].map((item) => item['uuid']),
  };
}
