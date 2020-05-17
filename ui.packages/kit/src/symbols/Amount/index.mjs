
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    min: types.number,
    max: types.number,
    value: types.object,
    disabled: types.bool,
    onFocus: types.func,
    onChange: types.func,
    onBlur: types.func,
  };

  static defaultProps = {
    min: 0,
    max: 1000,
    value: {
      min: 0,
      max: 1000,
    },
    disabled: false,
  };

  scrollerRef = React.createRef();
  minProgressRef = React.createRef();
  maxProgressRef = React.createRef();

  isStartMinMove = false;
  isStartMaxMove = false;

  minValue = 0;
  maxValue = 0;

  componentDidMount() {

    document.body.addEventListener('mousemove', this._handleMinMove.bind(this), false);
    document.body.addEventListener('mouseup', this._handleStop.bind(this), false);
  }

  componentWillUnmount() {

    document.body.removeEventListener('mousemove', this._handleMinMove.bind(this), false);
    document.body.removeEventListener('mouseup', this._handleStop.bind(this), false);
  }

  _handleMinStart(event) {
    const { onFocus } = this.props;
    this.isStartMinMove = true;
    onFocus && onFocus();
    event.preventDefault();
  }

  _handleMaxStart(event) {
    const { onFocus } = this.props;
    this.isStartMaxMove = true;
    onFocus && onFocus();
    event.preventDefault();
  }

  _handleStop = () => {
    const { onBlur, onChange } = this.props;
    this.isStartMinMove = false;
    this.isStartMaxMove = false;
    onChange && onChange({ min: this.minValue, max: this.maxValue });
    onBlur && onBlur();
  };

  _handleMinMove = (event) => {
    if (this.isStartMinMove) {
      const { clientX } = event;
      const { current: scroller } = this.scrollerRef;
      const { current: minProgress } = this.minProgressRef;
      const { current: maxProgress } = this.maxProgressRef;

      const scrollerRect = scroller.getBoundingClientRect();
      const minProgressRect = minProgress.getBoundingClientRect();
      const maxProgressRect = maxProgress.getBoundingClientRect();

      const minX = clientX - scrollerRect['left'];

      if (minX >= 0 && minX <= (maxProgressRect['left'] - scrollerRect['left'] - minProgressRect['width'])) {
        minProgress.style['left'] = minX + 'px';
        this.minValue = minX;
      }
    }

    if (this.isStartMaxMove) {
      const { clientX } = event;
      const { current: scroller } = this.scrollerRef;
      const { current: minProgress } = this.minProgressRef;
      const { current: maxProgress } = this.maxProgressRef;

      const scrollerRect = scroller.getBoundingClientRect();
      const minProgressRect = minProgress.getBoundingClientRect();
      const maxProgressRect = maxProgress.getBoundingClientRect();

      const maxX = clientX - scrollerRect['left'];

      if (maxX >= (minProgressRect['left'] - scrollerRect['left'] + minProgressRect['width'] - 1) && maxX <= scrollerRect['width'] - maxProgressRect['width']) {
        maxProgress.style['left'] = maxX + 'px';
        this.maxValue = maxX;
      }
    }
  };

  render() {
    const { value } = this.props;

    return (
      <div className={styles['wrapper']}>
        <div className={styles['values']}>
          <span className={styles['min']}>{ value['min'] }</span>
          <span className={styles['max']}>{ value['max'] }</span>
        </div>
        <div ref={this.scrollerRef} className={styles['scroller']}>
          <span ref={this.minProgressRef} className={styles['min-progress']} onMouseDown={this._handleMinStart.bind(this)} onMouseUp={this._handleStop.bind(this)} />
          <span ref={this.maxProgressRef} className={styles['max-progress']} onMouseDown={this._handleMaxStart.bind(this)} onMouseUp={this._handleStop.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Component;
