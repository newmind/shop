
export default function(data) {
  return {
    name: data['name'],
    code: data['code'],
    status: data['status']['isUse'],
  };
}