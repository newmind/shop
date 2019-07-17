
import {
  SET_PRODUCT_RECIPE,
} from './types';


export const setProductRecipeAction = (recipe) => ({
  type: SET_PRODUCT_RECIPE,
  payload: recipe,
});
