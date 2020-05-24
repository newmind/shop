
import { pageInProcessAction } from './actions';


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));
