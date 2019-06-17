
import { reduxForm } from 'redux-form';

import Component from './Componect';

export default reduxForm({
  form: 'payment-data',
})(Component);
