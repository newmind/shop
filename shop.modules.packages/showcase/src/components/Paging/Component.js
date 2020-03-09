
import types from 'prop-types';
import React, { PureComponent } from "react";

import cn from 'classnames';
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    page: types.number,
    pages: types.number,
  };

  static defaultProps = {
    page: 0,
    pages: 0,
  };

  _handleSetStart() {
    const { page, onChange } = this.props;

    if (page > 1) {
      onChange(1);
    }
  }

  _handleSetPrev() {
    const { page, onChange } = this.props;
    const prevPage = page - 1;

    if (prevPage >= 1) {
      onChange(prevPage);
    }
  }

  _handleSetNext() {
    const { page, pages, onChange } = this.props;
    const nextPage = page + 1;

    if (nextPage <= pages) {
      onChange(nextPage);
    }
  }

  _handleSetEnd() {
    const { page, pages, onChange } = this.props;

    if (page < pages) {
      onChange(pages);
    }
  }

  _handleSetPage(pageNum) {
    const { page, onChange } = this.props;

    if (page !== pageNum) {
      onChange(pageNum);
    }
  }

  _renderPageNums() {
    const { page, pages } = this.props;
    const pagesComponents = [];

    for (let pageNum = 1; pageNum < pages + 1; pageNum++) {
      const pageClassName = cn(styles['page'], {
        [styles['page--active']]: pageNum === page,
      });

      pagesComponents.push((
        <span key={pageNum} className={pageClassName} onClick={this._handleSetPage.bind(this, pageNum)}>
          <span className={styles['pae__number']}>{ pageNum }</span>
        </span>
      ));
    }
    return pagesComponents;
  }

  render() {
    const { page, pages } = this.props;
    const hasPages = pages > 1;

    const startClassName = cn(styles['start'], 'fas fa-angle-double-left', {
      [styles['start--disabled']]: page === 1
    });
    const prevClassName = cn(styles['prev'], 'fas fa-angle-left', {
      [styles['prev--disabled']]: page === 1
    });
    const nextClassName = cn(styles['next'], 'fas fa-angle-right', {
      [styles['next--disabled']]: page === pages,
    });
    const endClassName = cn(styles['end'], 'fas fa-angle-double-right', {
      [styles['end--disabled']]: page === pages,
    });

    return hasPages && (
      <div className={styles['paging']}>
        <span className={startClassName} onClick={this._handleSetStart.bind(this)} />
        <span className={prevClassName} onClick={this._handleSetPrev.bind(this)} />
        <div className={styles['pages']}>
          {this._renderPageNums()}
        </div>
        <span className={nextClassName} onClick={this._handleSetNext.bind(this)} />
        <span className={endClassName} onClick={this._handleSetEnd.bind(this)} />
      </div>
    );
  }
}

export default Component;
