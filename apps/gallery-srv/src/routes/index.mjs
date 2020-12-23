
import { getImage, deleteImages, createImage } from '../controllers/Gallery';


export default (router) => {

  router.get('/v1/api/images/:id', getImage());
  router.post('/v1/api/images', createImage());
  router.delete('/v1/api/images', deleteImages());
};
