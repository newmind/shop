
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import ProfileForm from './ProfileForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    profile: types.object,
    inProcess: types.bool,
  };

  static defaultProps = {
    profile: {},
    inProcess: false,
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
    const { profile, inProcess } = this.props;
    return (
      <div className="page">
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
              disabled={inProcess}
              onClick={this._handleSubmit.bind(this)}
            >Сохранить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
