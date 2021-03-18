
export default function(data) {
  return {
    id: data['id'],
    name: data['name'],
    description: data['description'],
    percent: data['percent'],
    dateFrom: data['dateFrom'],
    dateTo: data['dateTo'],
    products: data['products'].map((product) => product['productUuid']),
  };
}