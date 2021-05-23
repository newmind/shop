
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Comment } = models;

  await Comment.destroy({
    where: {
      productId: uuid,
    },
  });
}
