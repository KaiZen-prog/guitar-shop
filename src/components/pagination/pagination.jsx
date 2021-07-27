import React from 'react';
import PropTypes from 'prop-types';
import {generatePagination} from '../../utils/common';

const Pagination = ({page, numberOfPages, onChangePage}) => {
  return (
    <ul className="catalog__pagination">
      {page > 1 && (
        <li className="catalog__pagination-item">
          <a onClick={onChangePage} name={page - 1} href="#" className="catalog__pagination-link catalog__pagination-link--more">Назад</a>
        </li>
      )}
      {generatePagination(page, numberOfPages).map((elem, i) => (
        <li key={i} className="catalog__pagination-item">
          <a
            onClick={elem !== `...` ? onChangePage : (evt) => {
              evt.preventDefault();
            }}
            name={elem}
            href="#"
            className={`catalog__pagination-link ${+elem === page ? `catalog__pagination-link--active` : ``}`}
            disabled={+elem === page ? `disabled` : ``}
          >
            {elem}
          </a>
        </li>
      ))}
      {page < numberOfPages && (
        <li className="catalog__pagination-item">
          <a onClick={onChangePage} name={page + 1} href="#" className="catalog__pagination-link catalog__pagination-link--more">Далее</a>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;
