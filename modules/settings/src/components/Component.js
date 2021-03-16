
import { Header, Page, PageContent } from '@ui.packages/kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CommonForm from './CommonForm';
import ProfileForm from './ProfileForm';

import styles from './default.module.scss';

import { updateUserData, changeLogin } from '../ducks/commands';
import { selectProfile, selectInProcess } from '../ducks/slice';


function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const inProcess = useSelector(selectInProcess);

  function handleChangeLogin(data) {
    dispatch(changeLogin(data));
  }

  function handleChangeCustomer(data) {
    dispatch(updateUserData(data));
  }

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <div className={styles['header']}>
          <Header level={1}>Настройка пользователя</Header>
        </div>
        <div className={styles['container']}>
          <CommonForm
            initialValues={profile['user']}
            disabled={inProcess}
            onSubmit={(data) => handleChangeLogin(data)}
          />
        </div>
        <div className={styles['container']}>
          <ProfileForm
            initialValues={profile['customer']}
            disabled={inProcess}
            onSubmit={(data) => handleChangeCustomer(data)}
          />
        </div>
      </PageContent>
    </Page>
  );
}

export default Profile;
