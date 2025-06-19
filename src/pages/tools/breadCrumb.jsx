import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, activeIndex }) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, index) => (
          <li 
            key={item.id || index}
            className={`breadcrumb__item ${
              index === activeIndex ? 'breadcrumb__item--active' : ''
            }`}
            aria-current={index === activeIndex ? 'page' : undefined}
          >
            {index < items.length - 1 ? (
              <Link to={item.path} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb__text">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumb__separator" aria-hidden="true">
                &rsaquo;
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ).isRequired,
  activeIndex: PropTypes.number
};

Breadcrumb.defaultProps = {
  activeIndex: -1
};

export default Breadcrumb;