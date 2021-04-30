
export default function(data) {
  return {
    uuid: data['uuid'],
    name: data['name'],
    brand: data['brands'].length ? data['brands'][0]['value'] : null,
    preview: data['gallery'].length ? data['gallery'][0]['uuid'] : null,
  };
}