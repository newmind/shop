
export default function(data) {
  return {
    id: data['id'],
    role: data['role'].length ? data['role'][0] : null,
    login: data['login'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
    customerId: data['customer'] ? data['customer']['customerId'] : null,
  };
}