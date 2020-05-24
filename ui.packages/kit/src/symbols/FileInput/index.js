
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


// let contentElement = document.getElementById("content");

// Button callback
// async function onButtonClicked(){
//   let files = await selectFile("image/*", true);
//   contentElement.innerHTML = files.map(file => '<img src="${URL.createObjectURL(file)}" style="width: 100px; height: 100px;">').join('');
// }

// ---- function definition ----
// function selectFile (contentType, multiple){
//   return new Promise(resolve => {
//     let input = document.createElement('input');
//     input.type = 'file';
//     input.multiple = multiple;
//     input.accept = contentType;
//
//     input.onchange = _ => {
//       let files = Array.from(input.files);
//       if (multiple)
//         resolve(files);
//       else
//         resolve(files[0]);
//     };
//
//     input.click();
//   });
// }


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    type: types.oneOf(['text', 'password']),
    format: types.oneOf(['string', 'number']),
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.any,
    disabled: types.bool,
    onChange: types.func,
  };

  static defaultProps = {
    className: '',
    type: 'text',
    format: 'string',
    mode: 'default',
    value: '',
    disabled: false,
  };

  state = {
    file: null,
  };

  _handleAddImages() {
    const { onChange } = this.props;
    const inputElement = document.createElement('input');

    inputElement.classList.add(styles['input']);
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.accept = '.jpg, .jpeg, .bmp, .png';

    inputElement.onchange = () => {
      const file = inputElement['files'][0];

      this.setState({ file }, () => {
        onChange(file);
        inputElement.remove();
      });
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
        <span className={styles['container']}>
          {file
          ? (
              <span className={styles['file-name']}>{ file['name'] }</span>
            )
          : (
              <span className={styles['placeholder']}>Выбрать файл</span>
            )
          }
        </span>
        <span className={styles['button']}>
          <span className={styles['button__caption']}>Выбрать</span>
        </span>
      </div>
    );
  }
}

export default Component;
