
import { selectInProcess, selectPromotions } from "@modules/admin-product-modify";

import { Col, Header, ListField, Row } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from "react-redux";

import styles from './default.module.scss';


function Promotions() {
  const promotions = useSelector(selectPromotions);
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>План скидок</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <ListField
              name="promotions"
              // label="Планы"
              options={promotions}
              optionKey="id"
              optionValue="name"
              disabled={inProcess}
            />
          </Col>
        </Row>
      </div>
    </div>

  );
}

export default Promotions;
