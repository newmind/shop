
export default function(data) {
  return {
    id: data['id'],
    login: data['login'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
    role: data['role'].length ? data['role'][0] : null,
    customerId: data['customer'] ? data['customer']['customerId'] : null,
  };
}
