'use strict';

import numeral from 'numeral';


if (numeral.locale() !== 'my') {
  numeral.register('locale', 'my', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
  });
}

numeral.locale('my');
numeral.defaultFormat('0,0[.]00');

export default numeral;