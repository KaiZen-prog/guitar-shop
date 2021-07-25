import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";

const Header = ({cart}) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="#" className="header__logo"></a>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to={AppRoute.CATALOG} className="header__nav-link">Каталог</Link>
            </li>
            <li className="header__nav-item">
              <a href="#top" className="header__nav-link">Где купить?</a>
            </li>
            <li className="header__nav-item">
              <a href="#top" className="header__nav-link">О компании</a>
            </li>
            <li className="header__nav-item">
              <a href="#top" className="header__nav-link">Сервис-центры</a>
            </li>
          </ul>
        </nav>

        <section className="header__services">
          <a href="#top" className="header__services-link header__services-link--location">
            <span className="visually-hidden">Адрес магазина</span>
          </a>
          <a href="#top" className="header__services-link header__services-link--search">
            <span className="visually-hidden">Поиск</span>
          </a>
          <Link to={AppRoute.CART} className="header__services-link header__services-link--cart">
            <span className="header__cart-count">{cart.length > 0 ? cart.length : ``}</span>
            <span className="visually-hidden">Корзина</span>
          </Link>
        </section>
      </div>
    </header>
  );
};

Header.displayName = `Header`;

const mapStateToProps = ({cart}) => ({
  cart,
});

Header.propTypes = {
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
}

export default connect(mapStateToProps)(Header);
