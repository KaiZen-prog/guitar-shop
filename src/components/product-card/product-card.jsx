import React from 'react';
import {Repeat} from '../../utils/common';
import PropTypes from 'prop-types';

const ProductCard = ({product, onBuyButtonClick}) => {

  return (
      <li className="catalog__item">
        <img src={product.photo} alt="Гитара" className="catalog__item-photo" />
        <div className="catalog__reviews-block">
          <Repeat numTimes={5}>
            {(j) => (
                <span
                    key={j}
                    className={`catalog__reviews-star ${product.rating >= j + 1 
                        ? 'catalog__reviews-star--active' 
                        : ''}`}
                ></span>
            )}
          </Repeat>
          <span className="catalog__quantity-reviews">{product.numberOfReviews}</span>
        </div>
        <div className="catalog__item-info">
          <p className="catalog__item-name">{product.name}</p>
          <p className="catalog__item-price">{product.price.toLocaleString()} ₽</p>
        </div>
        <div className="catalog__item-more">
          <a href="#top" className="catalog__item-link">Подробнее</a>
          <button className="catalog__add-to-cart" onClick={() => {
            onBuyButtonClick(product);
          }}>Купить</button>
        </div>
      </li>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    numberOfReviews: PropTypes.number.isRequired,
  }).isRequired,

  onBuyButtonClick: PropTypes.func.isRequired,
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
