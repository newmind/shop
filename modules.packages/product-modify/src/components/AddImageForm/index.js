
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Image, Row, Col } from '@ui.packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    path: types.string,
  };

  static defaultProps = {
    path: '',
  };

  _handleAddImages() {
    const { input } = this.props;
    const inputElement = document.createElement('input');

    inputElement.classList.add(styles['input']);
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.accept = '.jpg, .bmp, .png';

    inputElement.onchange = () => {
      let files = [...input['value'] || [], ...inputElement['files']];
      this.setState({ files }, () => input.onChange(files));
    };

    inputElement.click();
  }

  _normalizeURI(src) {
    const { path } = this.props;
    if (src.constructor === File) {
      return URL.createObjectURL(src);
    } else {
      return path + '/' + src;
    }
  }

  render() {
    const { input } = this.props;
    return (
      <div className={styles['wrapper']}>
        <Row>
          <Col>
            <div className={styles['content']}>
              {(input['value'] || []).map((file, key) => {
                return (
                  <Image key={key} className={styles['image']} src={this._normalizeURI(file)}/>
                );
              })}
              <span className={styles['add-image']} onClick={this._handleAddImages.bind(this)}>
              <span className={cn('fas fa-plus', styles['add-image__icon'])}/>
            </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;