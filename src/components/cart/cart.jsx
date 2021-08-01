import React from 'react';
import PropTypes from 'prop-types';
import withCart from '../../hocs/with-cart/with-cart';
import { typeOfGuitars } from '../../mocks/mocks';
import {Repeat} from '../../utils/common';
import ChangeCartPopup from '../change-cart-popup/change-cart-popup';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

const Cart = ({cart, quantityGuitarsFromCart, removeFromCart, popupOpened, selectedGuitar, totalPrice, onPopupOpening, onPopupClosure, changeQuantityGuitars, onApplyPromocode}) => {
  return (
      <section className="cart container">
        <h1 className="cart__title">Корзина</h1>
        <Breadcrumbs additionalClass="cart__breadcrumbs" pathChain={[{name: `Главная`, link: `#`}, {name: `Каталог`, link: `/catalog`}, {name: `Оформляем`}]}/>
        <ul className="cart__list">
          <Repeat numTimes={cart.length}>
            {(i) => (
                <li className="cart__item" key={i}>
                  <button className="cart__delete-btn" onClick={() => {
                    onPopupOpening(cart[i]);
                  }}>
                    <span className="visually-hidden">Удалить товар</span>
                  </button>
                  <img src={`./img/${cart[i].photo}.jpg`} alt="Гитара" className="cart__item-photo" />
                  <div className="cart__item-info">
                    <h3 className="cart__item-title">{typeOfGuitars[cart[i].type]} {cart[i].name}</h3>
                    <p className="cart__vendor-code">Артикул: {cart[i].vendorCode}</p>
                    <p className="cart__item-params">{typeOfGuitars[cart[i].type]}, {cart[i].numberOfStrings} струнная</p>
                  </div>
                  <p className="cart__item-price">{cart[i].price.toLocaleString()} ₽</p>
                  <div className="cart__quantity-block">
                    <button className="cart__quantity-btn cart__quantity-btn--minus" onClick={() => {
                      if (quantityGuitarsFromCart[cart[i].name] - 1 <= 0) {
                        onPopupOpening(cart[i])
                        changeQuantityGuitars(cart[i].name, 1);
                      } else {
                        changeQuantityGuitars(cart[i].name, quantityGuitarsFromCart[cart[i].name] - 1);
                      }
                    }}>–</button>
                    <input
                        type="number"
                        className="cart__quantity-item"
                        value={quantityGuitarsFromCart[cart[i].name]}
                        onChange={(evt) => {
                          changeQuantityGuitars(cart[i].name, Number(evt.target.value));
                        }}
                        onBlur={(evt) => {
                          if (evt.target.value <= 0) {
                            changeQuantityGuitars(cart[i].name, 1);
                            onPopupOpening(cart[i])
                          } else {
                            changeQuantityGuitars(cart[i].name, Number(evt.target.value));
                          }
                        }}
                    />
                    <button className="cart__quantity-btn cart__quantity-btn--plus" onClick={() => {
                      changeQuantityGuitars(cart[i].name, Number(quantityGuitarsFromCart[cart[i].name] + 1));
                    }}>+</button>
                  </div>
                  <p className="cart__total-price-item">{(cart[i].price * quantityGuitarsFromCart[cart[i].name]).toLocaleString()} ₽</p>
                </li>
            )}
          </Repeat>
        </ul>
        <section className="cart__registration-order">
          <div className="cart__discount">
            <h3 className="cart__discount-title">Промокод на скидку</h3>
            <p className="cart__discount-info">Введите свой промокод, если он у вас есть.</p>
            <div className="cart__discount-container">
              <input type="text" className="cart__promocode" defaultValue=""/>
              <button className="cart__promocode-apply" onClick={(evt) => {
                onApplyPromocode(evt.target.previousElementSibling.value);
              }}>Применить купон</button>
            </div>
          </div>
          <div className="cart__total">
            <p className="cart__total-price">Всего: {totalPrice.toLocaleString()} ₽ </p>
            <a href="#top" className="cart__submit-order">Оформить заказ</a>
          </div>
        </section>
        {popupOpened && (
            <ChangeCartPopup actionType="remove" guitar={selectedGuitar} onPopupClosure={onPopupClosure} removeFromCart={removeFromCart}/>
        )}
      </section>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        numberOfStrings: PropTypes.number.isRequired,
        vendorCode: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        numberOfReviews: PropTypes.number.isRequired,
      })
  ).isRequired,
  quantityGuitarsFromCart: PropTypes.objectOf(PropTypes.number).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  popupOpened: PropTypes.bool.isRequired,
  selectedGuitar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      numberOfStrings: PropTypes.number.isRequired,
      vendorCode: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      numberOfReviews: PropTypes.number.isRequired,
    })
  ]).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onPopupOpening: PropTypes.func.isRequired,
  onPopupClosure: PropTypes.func.isRequired,
  changeQuantityGuitars: PropTypes.func.isRequired,
  onApplyPromocode: PropTypes.func.isRequired,
}

Cart.displayName = `Cart`;

export default withCart(Cart);
