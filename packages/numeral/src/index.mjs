
import numeral from 'numeral';


numeral.register('locale', 'user-local', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
});

numeral.locale('user-local');
numeral.defaultFormat('0 0.00');

export default numeral;
