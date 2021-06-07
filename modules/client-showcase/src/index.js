
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetState,

  resetProductAction,

  selectInProcess,

  selectMeta,
  selectTypes,
  selectItems,
  selectBrands,
  selectProduct,
  selectCategories,
} from './ducks/slice';

export {
  getProduct,
  getProducts,
} from './ducks/commands';