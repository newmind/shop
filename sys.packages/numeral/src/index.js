'use strict';

import numeral from 'numeral';

numeral.register('locale', 'my', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
});
numeral.locale('my');
numeral.defaultFormat('0,0[.]00');

export default numeral;