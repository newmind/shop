
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Image from '../Image';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.any,
    accept: types.string,
    disabled: types.bool,
    onChange: types.func,
  };

  static defaultProps = {
    className: '',
    mode: 'default',
    value: '',
    accept: '.jpg, .jpeg, .bmp, .png',
    disabled: false,
  };

  state = {
    file: null,
  };

  _handleAddImages() {
    const { accept, onChange } = this.props;
    const inputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.multiple = false;
    inputElement.accept = accept;
    inputElement.classList.add(styles['input']);

    inputElement.onchange = () => {
      const file = inputElement['files'][0];

      const fr = new FileReader();
      fr.onload = (e) => {
        this.setState({ file: e.target.result }, () => {
          onChange(file);
          inputElement.remove();
        });
      };
      fr.readAsDataURL(file);
    };

    inputElement.click();
  }

  _handleFocus(event) {
    event.stopPropagation();

    this._handleAddImages();
  };

  render() {
    const { file } = this.state;
    const { className, disabled, mode } = this.props;

    const classNameInputContainer = cn(className, styles['wrapper'], {
      [styles['container--primary']]: mode === PRIMARY_MODE,
      [styles['container--success']]: mode === SUCCESS_MODE,
      [styles['container--info']]: mode === INFO_MODE,
      [styles['container--danger']]: mode === DANGER_MODE,
      [styles['container--warning']]: mode === WARNING_MODE,
      [styles['container--disabled']]: disabled,
    });

    return (
      <div className={classNameInputContainer} onClick={this._handleFocus.bind(this)}>
        <div className={styles['container']}>
          {file
            ? <Image className={styles['image']} src={file} />
            : (
              <div className={styles['placeholder']}>
                <span className={cn(styles['logo'], 'far fa-smile')} />
              </div>
            )
          }
        </div>
        <div className={styles['add']}>
          <i className="fas fa-camera-retro" />
        </div>
      </div>
    );
  }
}

export default Component;
