
import HOC from "@ui.packages/hoc";

import Component from './Component';


export default HOC({
  onMount: () => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Выбор очков, оправ и аксесуаров');
  }
})(Component);
