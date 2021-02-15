
import { Mode } from '@ui.packages/types';
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submit, isValid, isPristine } from 'redux-form';

import ProfileForm from './ProfileForm';

import styles from './default.module.scss';

import { updateProfile } from '../ducks/commands';
import { selectProfile, selectInProcess } from '../ducks/slice';


function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const inProcess = useSelector(selectInProcess);
  const valid = useSelector(isValid('profile'));
  const pristine = useSelector(isPristine('profile'));

  function handleSave(data) {
    dispatch(updateProfile(data));
  }

  function handleSubmit() {
    dispatch(submit('profile'));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            mode={Mode.SUCCESS}
            disabled={ ! valid || pristine || inProcess}
            onClick={() => handleSubmit()}
          >Сохранить</Button>
        </div>
      </PageControls>
      <PageContent>
        <div className={styles['header']}>
          <Header level={1}>Профайл</Header>
        </div>
        <div className={styles['container']}>
          <ProfileForm
            initialValues={profile}
            disabled={inProcess}
            onSubmit={(data) => handleSave(data)}
          />
        </div>
      </PageContent>
    </Page>
  );
}

export default Profile;
