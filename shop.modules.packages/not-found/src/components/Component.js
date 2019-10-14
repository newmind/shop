
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className="page">
        <p>Страница не существует. Вернитесь на <Link to="/">главную</Link></p>
      </div>
    );
  }
}

export default Component;