
import { getAllTypes, createType, updateType, deleteType } from '../controllers/Types';
import { getAllForms, createForm, updateForm, deleteForms } from '../controllers/Forms';
import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/Units';
import { getAllColors, createColor, updateColor, deleteColor } from '../controllers/Colors';
import { getAllMaterials, createMaterial, updateMaterial, deleteMaterials } from '../controllers/Materials';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/Category';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/Currency';

import { getProducts, createProduct, deleteProductById, updateProductById } from '../controllers/Products';
import { getTypesCount, getFormsCount, getBrandsCount, getColorsCount, getMaterialsCount, getCategoriesCount } from '../controllers/Products';

import { getAllComments, deleteComments, createComment, updateComment } from '../controllers/Comments';


export default (router) => {

  router.get('/v1/api/types', getAllTypes());
  router.post('/v1/api/types', createType());
  router.put('/v1/api/types/:id', updateType());
  router.delete('/v1/api/types', deleteType());

  router.get('/v1/api/categories', getAllCategories());
  router.post('/v1/api/categories', createCategory());
  router.put('/v1/api/categories/:id', updateCategory());
  router.delete('/v1/api/categories', deleteCategories());

  router.get('/v1/api/colors', getAllColors());
  router.post('/v1/api/colors', createColor());
  router.put('/v1/api/colors/:id', updateColor());
  router.delete('/v1/api/colors', deleteColor());

  router.get('/v1/api/materials', getAllMaterials());
  router.post('/v1/api/materials', createMaterial());
  router.put('/v1/api/materials/:id', updateMaterial());
  router.delete('/v1/api/materials', deleteMaterials());

  router.get('/v1/api/forms', getAllForms());
  router.post('/v1/api/forms', createForm());
  router.put('/v1/api/forms/:id', updateForm());
  router.delete('/v1/api/forms', deleteForms());

  router.get('/v1/api/currencies', getAllCurrencies());
  router.post('/v1/api/currencies', createCurrency());
  router.put('/v1/api/currencies/:uuid', updateCurrency());
  router.delete('/v1/api/currencies', deleteCurrencies());

  router.get('/v1/api/units', getAllUnits());
  router.post('/v1/api/units', createUnit());
  router.put('/v1/api/units/:id', updateUnit());
  router.delete('/v1/api/units', deleteUnits());

  router.get('/v1/api/products/types', getTypesCount());
  router.get('/v1/api/products/forms', getFormsCount());
  router.get('/v1/api/products/brands', getBrandsCount());
  router.get('/v1/api/products/colors', getColorsCount());
  router.get('/v1/api/products/materials', getMaterialsCount());
  router.get('/v1/api/products/categories', getCategoriesCount());

  router.get('/v1/api/products', getProducts());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:uuid', updateProductById());
  router.delete('/v1/api/products', deleteProductById());

  router.get('/v1/api/comments', getAllComments());
  router.post('/v1/api/comments', createComment());
  router.put('/v1/api/comments/:id', updateComment());
  router.delete('/v1/api/comments', deleteComments());
};
