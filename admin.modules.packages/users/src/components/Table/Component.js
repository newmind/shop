
import moment from '@ui.packages/moment';
import { Table, Column } from '@ui.packages/table';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


const roles = {
  admin: 'Админ',
  customer: 'Клиент',
};


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;

    return (
      <div className={styles['block']}>
        <Table
          columns={items}
        >
          <Column
            title="ID"
            alias="id"
            width="40"
            align="left"
          />
          <Column
            title="Логин"
            alias="login"
            align="left"
          />
          <Column
            title="Пользователь"
            alias="user"
            align="left"
          >{(value) => (
            <div className={styles['name']}>
              {value['surname'] ? value['surname'] : null }
              {value['name'] ? ' ' + value['name'] : null }
              {value['patronymic'] ? ' ' + value['patronymic'] : null }
            </div>
          )}</Column>
          <Column
            title="Роль"
            alias="user"
            width="120"
            transform={(value) => roles[value['role']]}
          />
          <Column
            title="Создан"
            alias="createdAt"
            width="120"
            transform={(value) => moment(value).format('DD.MM.YYYY')}
          />
        </Table>
      </div>
    );
  }
}

export default Component;
