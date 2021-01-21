
import {
  signIn,
  signOut,
  getAll as getAllUsers,
  get as getUser,
  update as updateUser,
} from '../controllers/User/index.mjs';

import {
  getAll as getOperations,
  getById as getOperationById,
  create as createOperation,
  updateById as updateOperationById,
} from '../controllers/Orders/index.mjs';

import { getAllTypes, createType, updateType, deleteType } from '../controllers/Types/index.mjs';
import { getAllForms, createForm, updateForm, deleteForms } from '../controllers/Forms/index.mjs';
import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/Units/index.mjs';
import { getAllColors, createColor, updateColor, deleteColors } from '../controllers/Colors/index.mjs';
import { getAllMaterials, createMaterial, updateMaterial, deleteMaterials } from '../controllers/Meterials/index.mjs';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/Category/index.mjs';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/Currency/index.mjs';

import { getProducts, getProduct,  createProduct, updateProduct, deleteProducts } from '../controllers/Products/index.mjs';

import { getImage, deleteImages } from '../controllers/Gallery/index.mjs';
import { getComments, createComment, updateComment, deleteComments } from '../controllers/Comments/index.mjs';

import { getAllStatuses } from '../controllers/Statuses/index.mjs';


export default (router) => {

  router.get('/statuses', getAllStatuses());

  router.get('/types', getAllTypes());
  router.post('/types', createType());
  router.put('/types/:id', updateType());
  router.delete('/types', deleteType());

  router.get('/categories', getAllCategories());
  router.post('/categories', createCategory());
  router.put('/categories/:id', updateCategory());
  router.delete('/categories', deleteCategories());

  router.get('/colors', getAllColors());
  router.post('/colors', createColor());
  router.put('/colors/:id', updateColor());
  router.delete('/colors', deleteColors());

  router.get('/materials', getAllMaterials());
  router.post('/materials', createMaterial());
  router.put('/materials/:id', updateMaterial());
  router.delete('/materials', deleteMaterials());

  router.get('/forms', getAllForms());
  router.post('/forms', createForm());
  router.put('/forms/:id', updateForm());
  router.delete('/forms', deleteForms());

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