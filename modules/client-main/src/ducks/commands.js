
import request from "@ui.packages/request";
import { pushNotification } from '@ui.packages/notifications';

import { getMainAction } from './slice';


export const getTypes = () => async (dispatch) => {
  try {
    const result = await request({
      url: '/main',
    });

    dispatch(getMainAction(result['data']));
  }
  catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка при загрузке глфвной страницы',
      mode: 'danger',
    }));
  }
};

