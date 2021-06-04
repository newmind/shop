
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  selectFilter,
  selectInProcess,
  selectMeta,
  selectItems,
  selectPromotions,

  resetState,

  removeImageAction,

  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,

  setPromotionRequestAction,
  setPromotionRequestFailAction,
  setPromotionRequestSuccessAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  updateProductsRequestAction,
  updateProductsRequestFailAction,
  updateProductsRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,

  copyProductRequestAction,
  copyProductRequestFailRequest,
  copyProductRequestSuccessAction,
} from './ducks/slice';

export {
  getProducts,
  getPromotions,
  copyProductById,
  removeProductById,
  updateStatusProductById,
} from './ducks/commands';