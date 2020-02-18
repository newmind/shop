
import { reduxForm } from 'redux-form';

import Component from './Comments';


export default reduxForm({
  form: 'comment-modify',
})(Component);
