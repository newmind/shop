
export { default as Widget } from './components';

export {
  name,
  reducer,

  selectUuid,
  selectItems,
  selectIsOpen,

  addProductToCartAction,
  removeProductFromCartAction,

  resetCartAction,
  restoreCartAction,
} from './ducks/slice';
