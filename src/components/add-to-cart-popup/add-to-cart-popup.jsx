import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const AddToCartPopup = ({onPopupClosure}) => {
  return (
      <div className="add-to-cart" onClick={onPopupClosure}>
        <div className="add-to-cart__container" onClick={(evt) => evt.stopPropagation()}>
          <button className="add-to-cart__close-icon" onClick={onPopupClosure}></button>
          <h2 className="add-to-cart__title">Товар успешно добавлен в корзину</h2>
          <div className="add-to-cart__action-container">
            <Link to="/cart" className="add-to-cart__link">Перейти в корзину</Link>
            <button className="add-to-cart__close-btn" onClick={onPopupClosure}>Продолжить покупки</button>
          </div>
        </div>
      </div>
  );
}

AddToCartPopup.propTypes = {
  onPopupClosure: PropTypes.func.isRequired,
}

AddToCartPopup.displayName = `AddToCartPopup`;

export default AddToCartPopup;
