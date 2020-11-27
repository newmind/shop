
import types from 'prop-types';
import React from "react";

import cn from 'classnames';
import styles from "./default.module.scss";


function PageNums({ pages, onClick }) {
  const pagesComponents = [];

  for (let pageNum = 1; pageNum < pages + 1; pageNum++) {
    const pageClassName = cn(styles['page'], {
      [styles['page--active']]: pageNum === page,
    });

    pagesComponents.push((
      <span key={pageNum} className={pageClassName} onClick={() => onClick(pageNum)}>
          <span className={styles['pae__number']}>{ pageNum }</span>
        </span>
    ));
  }
  return pagesComponents;
}


function Paging({ page, pages, onChange }) {
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

  function handleSetStart() {
    if (page > 1) {
      onChange(1);
    }
  }

  function handleSetPrev() {
    const prevPage = page - 1;

    if (prevPage >= 1) {
      onChange(prevPage);
    }
  }

  function handleSetNext() {
    const nextPage = page + 1;

    if (nextPage <= pages) {
      onChange(nextPage);
    }
  }

  function handleSetEnd() {
    if (page < pages) {
      onChange(pages);
    }
  }

  function handleSetPage(pageNum) {
    if (page !== pageNum) {
      onChange(pageNum);
    }
  }

  return hasPages && (
    <div className={styles['paging']}>
      <span className={startClassName} onClick={() => handleSetStart()} />
      <span className={prevClassName} onClick={() => handleSetPrev()} />
      <div className={styles['pages']}>
        <PageNums pages={pages} onClick={(page) => handleSetPage(page)} />
      </div>
      <span className={nextClassName} onClick={() => handleSetNext()} />
      <span className={endClassName} onClick={() => handleSetEnd()} />
    </div>
  );
}

Paging.propTypes = {
  page: types.number,
  pages: types.number,
};

Paging.defaultProps = {
  page: 0,
  pages: 0,
};

export default Paging;
