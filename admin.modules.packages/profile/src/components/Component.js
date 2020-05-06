
import { Button } from '@ui.packages/kit';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import ProfileForm from './ProfileForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    profile: types.object,
    inProcess: types.bool,
    isValid: types.bool,
    isPristine: types.bool,
  };

  static defaultProps = {
    profile: {},
    inProcess: false,
    isValid: false,
    isPristine: false,
  };

  _handleSave(data) {
    const { saveProfile } = this.props;
    saveProfile(data);
  }

  _handleSubmit() {
    const { submit } = this.props;
    submit('profile');
  }

  render() {
    const { profile, inProcess, isValid, isPristine } = this.props;

    return (
      <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <h2>Пользователь</h2>
        </div>
        <div className={styles['container']}>
          <div className={styles['form']}>
            <ProfileForm
              initialValues={profile}
              disabled={inProcess}
              onSubmit={this._handleSave.bind(this)}
            />
          </div>
          <div className={styles['controls']}>
            <Button
              mode="success"
              disabled={ ! isValid || isPristine || inProcess}
              onClick={this._handleSubmit.bind(this)}
            >Сохранить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
