
import { getAllBrands, createBrand, updateBrand, deleteBrand } from '../controllers/Brands';
import { getAllTypes, createType, updateType, deleteType } from '../controllers/Types';
import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/Units';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/Category';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/Currency';
import { getAllAttributes, deleteAttributes, updateAttribute, createAttribute } from '../controllers/Attributes';

import { getProducts, createProduct, deleteProductById, updateProductById, setPromotion } from '../controllers/Products';
import { getTypesCount, getBrandsCount, getCategoriesCount } from '../controllers/Products';

import { getAllComments, deleteComments, createComment, updateComment } from '../controllers/Comments';

import { getAllPromotions, deletePromotions, createPromotion, updatePromotion } from '../controllers/Promotion';


export default (router) => {

  router.get('/v1/api/brands', getAllBrands());
  router.post('/v1/api/brands', createBrand());
  router.put('/v1/api/brands/:id', updateBrand());
  router.delete('/v1/api/brands', deleteBrand());

  router.get('/v1/api/types', getAllTypes());
  router.post('/v1/api/types', createType());
  router.put('/v1/api/types/:id', updateType());
  router.delete('/v1/api/types', deleteType());

  router.get('/v1/api/categories', getAllCategories());
  router.post('/v1/api/categories', createCategory());
  router.put('/v1/api/categories/:id', updateCategory());
  router.delete('/v1/api/categories', deleteCategories());

  router.get('/v1/api/attributes', getAllAttributes());
  router.post('/v1/api/attributes', createAttribute());
  router.put('/v1/api/attributes/:id', updateAttribute());
  router.delete('/v1/api/attributes', deleteAttributes());

  router.get('/v1/api/currencies', getAllCurrencies());
  router.post('/v1/api/currencies', createCurrency());
  router.put('/v1/api/currencies/:uuid', updateCurrency());
  router.delete('/v1/api/currencies', deleteCurrencies());

  router.get('/v1/api/units', getAllUnits());
  router.post('/v1/api/units', createUnit());
  router.put('/v1/api/units/:id', updateUnit());
  router.delete('/v1/api/units', deleteUnits());

  router.get('/v1/api/products/types', getTypesCount());
  router.get('/v1/api/products/brands', getBrandsCount());
  router.get('/v1/api/products/categories', getCategoriesCount());

  router.get('/v1/api/products', getProducts());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:uuid', updateProductById());
  router.delete('/v1/api/products', deleteProductById());
  router.post('/v1/api/products/:uuid/promotion', setPromotion());

  router.get('/v1/api/comments', getAllComments());
  router.post('/v1/api/comments', createComment());
  router.put('/v1/api/comments/:id', updateComment());
  router.delete('/v1/api/comments', deleteComments());

  router.get('/v1/api/promotions', getAllPromotions());
  router.post('/v1/api/promotions', createPromotion());
  router.put('/v1/api/promotions/:uuid', updatePromotion());
  router.delete('/v1/api/promotions', deletePromotions());
};
