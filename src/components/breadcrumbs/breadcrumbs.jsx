import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Repeat} from '../../utils/common';

const Breadcrumbs = ({pathChain, additionalClass}) => {
  return (
    <ul className={`breadcrumbs ${additionalClass}`}>
      <Repeat numTimes={pathChain.length}>
        {(i) => (
          <li key={i} className="breadcrumbs__item">
            {i === pathChain.length - 1 && (
              <a className="breadcrumbs__link">{pathChain[i].name}</a>
            )}
            {i < pathChain.length - 1 && (
              <Link to={pathChain[i].link} className="breadcrumbs__link">{pathChain[i].name}</Link>
            )}
          </li>
        )}
      </Repeat>
    </ul>
  );
};

Breadcrumbs.propTypes = {
  pathChain: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
  })).isRequired,
  additionalClass: PropTypes.string,
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
