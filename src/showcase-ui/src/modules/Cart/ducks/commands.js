
import {
  setProductRecipeAction,
} from './actions';


export const setProductRecipe = (recipe) => dispatch => {

  dispatch(setProductRecipeAction(recipe));
};
