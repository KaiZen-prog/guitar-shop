import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {typeOfGuitars} from '../../mocks/mocks';
import {ActionCreator} from '../../store/actions/actions';

const ChangeCartPopup = ({actionType, product, onAddToCart, onPopupClosure, addToCart, removeFromCart}) => {
  const {photo, name, vendorCode, type, numberOfStrings, price} = product;

  return (
      <div className="change-cart" onClick={onPopupClosure}>
        <div className="change-cart__container" onClick={(evt) => evt.stopPropagation()}>
          <button className="change-cart__close-icon" onClick={onPopupClosure}></button>
          <h2 className="change-cart__title">
            {actionType === 'add' && ('Добавить товар в корзину')}
            {actionType === 'remove' && ('Удалить этот товар? ')}
          </h2>
          <div className="change-cart__content-container">
            <img src={photo} alt="Гитара" className="change-cart__item-photo" />
            <div className="change-cart__item-info">
              <h3 className="change-cart__item-title">Гитара {name}</h3>
              <p className="change-cart__vendor-code">Артикул: {vendorCode}</p>
              <p className="change-cart__item-params">{typeOfGuitars[type]}, {numberOfStrings} струнная</p>
              <p className="change-cart__item-price">Цена: {price.toLocaleString()} ₽</p>
            </div>
            <div className="change-cart__btns-container">
              <button className="change-cart__change-btn" onClick={actionType === 'add' ? () => {
                addToCart(product);
                onAddToCart();
              } : () => {
                removeFromCart(product);
                onPopupClosure();
              }}>
                {actionType === 'add' && ('Добавить в корзину')}
                {actionType === 'remove' && ('Удалить товар')}
              </button>
              {actionType === 'remove' && (
                  <button className="change-cart__close-btn" onClick={onPopupClosure}>Продолжить покупки</button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = ({cart, quantityGuitarsFromCart}) => ({
  cart,
  quantityGuitarsFromCart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart(guitar) {
    dispatch(ActionCreator.addToCart(guitar));
  },

  removeFromCart(guitar) {
    dispatch(ActionCreator.removeFromCart(guitar));
  },
});

ChangeCartPopup.propTypes = {
  actionType: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    numberOfStrings: PropTypes.number.isRequired,
    vendorCode: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    numberOfReviews: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onPopupClosure: PropTypes.func.isRequired,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCartPopup);
