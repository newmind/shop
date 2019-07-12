
import React, { PureComponent } from 'react';

import { Row, Col, SelectField } from '@ui.packages/ui';
import { Tabs, Tab, TabContainer } from '@ui.packages/tabs';


class Component extends PureComponent {
  static defaultProps = {
    values: {},
  };

  render() {
    return (
      <Tabs name="type" defaultTab="simple">
        <Tab name="simple" caption="Оправа или очки без рецепта" />
        <Tab name="eye-glasses" caption="Очки для зрения" />
        <Tab name="progressive" caption="Прогрессивы" />
        <Tab name="bifocal" caption="Бифокалы" />
        <Tab name="digress" caption="Дегрессивы" />

        <TabContainer to="simple">
          <Row>
            <Row>
              <Col>
                <SelectField
                  name="option-type"
                  options={[
                    { id: 1, value: 'Только оправа' },
                    { id: 2, value: 'Имиджевые линзы' },
                  ]}
                />
              </Col>
            </Row>
          </Row>
        </TabContainer>
        <TabContainer to="eye-glasses">
          <Row>
            <Col>
              <SelectField
                name="option-type"
                options={[
                  { id: 1, value: 'Для дали' },
                  { id: 2, value: 'Для чтения' },
                  { id: 3, value: 'Для средней дистанции' },
                ]}
              />
            </Col>
          </Row>
        </TabContainer>
        <TabContainer to="progressive">
          <Row>
            <Col>
              <SelectField
                name="option-type"
                options={[
                  { id: 1, value: 'Standard' },
                  { id: 2, value: 'Premium' },
                  { id: 3, value: 'Elite' },
                ]}
              />
            </Col>
          </Row>
        </TabContainer>
        <TabContainer to="bifocal">
          <Row>
            <Col>
              <SelectField
                name="option-type"
                options={[
                  { id: 1, value: 'R28' },
                  { id: 2, value: 'D28' },
                  { id: 3, value: 'D35' },
                  { id: 4, value: 'C28' },
                ]}
              />
            </Col>
          </Row>
        </TabContainer>
        <TabContainer to="digress">
          <Row>
            <Col>
              <span>Дигресс</span>
            </Col>
          </Row>
        </TabContainer>
      </Tabs>
    );
  }
}

export default Component;