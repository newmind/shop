
import React, { PureComponent } from 'react';

import Products from "./Products";
import Details from "./Details";

import { Row, Col } from "@ui.packages/ui";

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h2 className={styles['block__header']}>Выбранные товары</h2>
            <div className={styles['information']}>
              <p className={styles['paragraph']}>Вам необходимо выбрать дополнительные опции к товару:</p>
              <ol className={styles['list']}>
                <li className={styles['list__item']}><b>Только оправа</b> - преобретается только оправа с предустановленными заводскими модификациями.</li>
                <li className={styles['list__item']}><b>Имиджевые линзы</b> - преобретается оправа с линзами без диоптрий, но с выбранными защитами и паказателями.</li>
                <li className={styles['list__item']}><b>По рецепту</b> - преобретается оправа с линзами с установкой линз по медицинскому рецепту.</li>
              </ol>
            </div>
            <div className={styles['block__content']}>
              <Products />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className={styles['block__header']}>Оформление заказа</h2>
            <div className={styles['block__content']}>
              <Details />
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
