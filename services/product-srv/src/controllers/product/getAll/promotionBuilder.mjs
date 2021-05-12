
export default function(data) {
  return {
    id: data['id'],
    name: data['name'],
    description: data['description'],
    percent: data['percent'],
  };
}