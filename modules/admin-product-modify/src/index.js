
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  selectShops,
  selectBrands,
  selectTypes,
  selectCategories,
  selectCurrencies,
  selectInProcess,
  selectPromotions,
  selectAttributes,
  selectGallery,
  selectProduct,
  selectUnits,
  selectInCreateProcess,
} from './ducks/slice';

export {
  getShops,
  createType,
  createBrand,
  createCategory,
  createGallery,
  createProduct,
  updateProductsById,
} from './ducks/commands';
