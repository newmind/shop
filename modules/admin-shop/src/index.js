
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,
} from './ducks/slice';

export {
  selectItem,
  selectPayments,
  selectDeliveries,
  selectInProcess,
} from './ducks/slice';

export {
  getShop,
  createShop,
  updateShop,

  getPayments,
  getDeliveries,
} from './ducks/commands';
