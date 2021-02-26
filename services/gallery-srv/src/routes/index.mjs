
import { getImages, getImage, deleteImages, createImages } from '../controllers/Gallery';


export default (router) => {

  router.get('/v1/api/images', getImages());
  router.get('/v1/api/images/:id', getImage());
  router.post('/v1/api/images', createImages());
  router.delete('/v1/api/images', deleteImages());
};
