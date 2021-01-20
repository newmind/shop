
import { getImage, deleteImages, createImage } from '../controllers/Gallery/index.mjs';


export default (router) => {

  router.get('/v1/api/images/:id', getImage());
  router.post('/v1/api/images', createImage());
  router.delete('/v1/api/images', deleteImages());
};
