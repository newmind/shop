
import { getImages, getImage, deleteImages, createImages, copyImage } from '../controllers/Gallery';


export default (router) => {

  router.get('/v1/api/images', getImages());
  router.get('/v1/api/images/:id', getImage());
  router.post('/v1/api/images', createImages());
  router.delete('/v1/api/images', deleteImages());

  router.post('/v1/api/images/:uuid/copy', copyImage());
};
