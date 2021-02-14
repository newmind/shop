
import { getAllPromotions, deletePromotions, createPromotion, updatePromotion } from '../controllers/Promotion';
import { getAllProducts, deleteProducts, createProduct, updateProduct } from '../controllers/Product';


export default (router) => {

  router.get('/v1/api/promotions', getAllPromotions());
  router.post('/v1/api/promotions', createPromotion());
  router.put('/v1/api/promotions/:id', updatePromotion());
  router.delete('/v1/api/promotions', deletePromotions());

  router.get('/v1/api/products', getAllProducts());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:id', updateProduct());
  router.delete('/v1/api/products', deleteProducts());
};
