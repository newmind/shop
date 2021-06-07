
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  getTypes,
  getProduct,
} from './ducks/commands';

export {
  resetAction,

  resetProductAction,

  selectTypes,
  selectProduct,
  selectInProcess,
} from './ducks/slice';