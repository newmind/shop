'use strict';

import { addImages, getImageByFileName } from '../controllers/Gallery';
import { getProducts, getProductById,  createProduct, updateProduct, deleteProductById } from '../controllers/Products';

import {
  getAll as getCurrencies,
  create as createCurrency,
  deleteById as deleteCurrencyById,
  updateById as updateCurrencyById,
} from '../controllers/Currency';

import {
  getAll as getUnits,
  create as createUnit,
  deleteById as deleteUnitById,
  updateById as updateUnitById,
} from '../controllers/Units';

import {
  getAll as getAllCategories,
  create as createCategory,
  deleteById as deleteCategoryById,
  updateById as updateCategoryById,
} from '../controllers/Category';

import {
  signIn,
  signOut,
  get as getUser,
  update as updateUser,
} from '../controllers/User';

import {
  getAll as getOperations,
  getById as getOperationById,
  create as createOperation,
  updateById as updateOperationById,
} from '../controllers/Operatons';


export default (router) => {

  router.get('/products', getProducts());
  router.get('/products/:productId', getProductById());
  router.post('/products', createProduct());
  router.put('/products/:productId', updateProduct());
  router.delete('/products/:productId', deleteProductById());

  router.get('/operations', getOperations());
  router.get('/operations/:operationId', getOperationById());
  router.post('/operations', createOperation());
  router.put('/operations/:operationId', updateOperationById());

  router.get('/gallery/:fileName', getImageByFileName());
  router.post('/gallery', addImages());

  router.get('/currency', getCurrencies());
  router.post('/currency', createCurrency());
  router.put('/currency/:currencyId', updateCurrencyById());
  router.delete('/currency/:currencyId', deleteCurrencyById());

  router.get('/units', getUnits());
  router.post('/units', createUnit());
  router.put('/units/:unitId', updateUnitById());
  router.delete('/units/:unitId', deleteUnitById());

  router.get('/category', getAllCategories());
  router.post('/category', createCategory());
  router.put('/category/:categoryId', updateCategoryById());
  router.delete('/category/:categoryId', deleteCategoryById());

  router.post('/sign-in', signIn());
  router.post('/sign-out', signOut());
  router.get('/profile', getUser());
  router.put('/profile', updateUser());
};