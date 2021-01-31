
import {
  signIn,
  signOut,
  getAll as getAllUsers,
  get as getUser,
  update as updateUser,
} from '../controllers/User';

import {
  getAll as getOperations,
  getById as getOperationById,
  create as createOperation,
  updateById as updateOperationById,
} from '../controllers/Orders';

import { getAllTypes, createType, updateType, deleteType } from '../controllers/Types';
import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/Units';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/Category';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/Currency';
import { getAllAttributes, createAttribute, deleteAttributes, updateAttribute } from '../controllers/Attribute';

import { getProducts, getProduct,  createProduct, updateProduct, deleteProducts } from '../controllers/Products';
import { getAllPromotions, deletePromotions, updatePromotion, createPromotion } from '../controllers/Promotion';

import { getImage, deleteImages } from '../controllers/Gallery';
import { getComments, createComment, updateComment, deleteComments } from '../controllers/Comments';

import { getAllStatuses } from '../controllers/Statuses';


export default (router) => {

  router.get('/statuses', getAllStatuses());

  router.get('/types', getAllTypes());
  router.post('/types', createType());
  router.put('/types/:id', updateType());
  router.delete('/types', deleteType());

  router.get('/promotions', getAllPromotions());
  router.post('/promotions', createPromotion());
  router.put('/promotions/:id', updatePromotion());
  router.delete('/promotions', deletePromotions());

  router.get('/categories', getAllCategories());
  router.post('/categories', createCategory());
  router.put('/categories/:id', updateCategory());
  router.delete('/categories', deleteCategories());

  router.get('/attributes', getAllAttributes());
  router.post('/attributes', createAttribute());
  router.put('/attributes/:id', updateAttribute());
  router.delete('/attributes', deleteAttributes());

  router.get('/currencies', getAllCurrencies());
  router.post('/currencies', createCurrency());
  router.put('/currencies/:id', updateCurrency());
  router.delete('/currencies', deleteCurrencies());

  router.get('/units', getAllUnits());
  router.post('/units', createUnit());
  router.put('/units/:id', updateUnit());
  router.delete('/units', deleteUnits());

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProduct());
  router.post('/products', createProduct());
  router.put('/products/:id', updateProduct());
  router.delete('/products', deleteProducts());

  router.get('/operations', getOperations());
  router.get('/operations/:operationId', getOperationById());
  router.post('/operations', createOperation());
  router.put('/operations/:externalId', updateOperationById());


  router.get('/comments', getComments());
  router.post('/comments', createComment());
  router.put('/comments/:id', updateComment());
  router.delete('/comments', deleteComments());


  router.get('/gallery/:id', getImage());
  router.delete('/gallery', deleteImages());


  router.post('/sign-in', signIn());
  router.post('/sign-out', signOut());
  router.get('/profile', getUser());
  router.put('/profile', updateUser());
  router.get('/users', getAllUsers());
};
