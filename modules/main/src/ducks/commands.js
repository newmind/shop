
import request from "@ui.packages/request";
import { pushNotification } from '@ui.packages/notifications';

import {
  getTypesAction,
  getCategoriesAction,
} from './slice';


export const getTypes = () => async (dispatch) => {
  try {
    const result = await request({
      url: '/types',
    });

    dispatch(getTypesAction(result['data']));
  }
  catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка при загрузке типов товаров',
      mode: 'danger',
    }));
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const result = await request({
      url: '/categories',
    });

    dispatch(getCategoriesAction(result['data']));
  }
  catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка при загрузке категорий товаров',
      mode: 'danger',
    }));
  }
};
