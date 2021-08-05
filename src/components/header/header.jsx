
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Header = ({cart}) => {
  return (
      <header className="header app__header">
        <div className="header__container container">
          <a href="#top" className="header__logo">
            <img src="./img/logo-header-desktop.svg" alt="Guitar shop"/>
          </a>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/catalog" className="header__nav-link">Каталог</Link>
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
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.875 7.35227C12.875 11.8068 6.875 15.625 6.875 15.625C6.875 15.625 0.875 11.8068 0.875 7.35227C0.875 5.83331 1.50714 4.37655 2.63236 3.30248C3.75758 2.22841 5.2837 1.625 6.875 1.625C8.4663 1.625 9.99242 2.22841 11.1176 3.30248C12.2429 4.37655 12.875 5.83331 12.875 7.35227Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.875 9.26154C7.97957 9.26154 8.875 8.40681 8.875 7.35245C8.875 6.29809 7.97957 5.44336 6.875 5.44336C5.77043 5.44336 4.875 6.29809 4.875 7.35245C4.875 8.40681 5.77043 9.26154 6.875 9.26154Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="visually-hidden">Адрес магазина</span>
            </a>
            <a href="#top" className="header__services-link header__services-link--search">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.0276 9.02893L13.7934 12.7948C13.9257 12.9273 14.0001 13.1069 14 13.2942C13.9999 13.4814 13.9255 13.661 13.793 13.7934C13.6606 13.9257 13.481 14.0001 13.2937 14C13.1064 13.9999 12.9269 13.9255 12.7945 13.793L9.0287 10.0271C7.90295 10.8991 6.48731 11.3094 5.06977 11.1746C3.65223 11.0399 2.33927 10.3701 1.39799 9.30165C0.456712 8.23318 -0.0421836 6.84624 0.0027973 5.42299C0.0477782 3.99973 0.633257 2.64707 1.64013 1.64017C2.647 0.633273 3.99963 0.0477794 5.42285 0.00279737C6.84607 -0.0421846 8.23297 0.456724 9.30142 1.39803C10.3699 2.33933 11.0396 3.65233 11.1743 5.0699C11.3091 6.48748 10.8988 7.90315 10.0269 9.02893H10.0276ZM5.60026 9.79961C6.71412 9.79961 7.78235 9.35712 8.56997 8.56948C9.35759 7.78185 9.80007 6.71358 9.80007 5.5997C9.80007 4.48581 9.35759 3.41755 8.56997 2.62992C7.78235 1.84228 6.71412 1.39979 5.60026 1.39979C4.4864 1.39979 3.41817 1.84228 2.63055 2.62992C1.84293 3.41755 1.40046 4.48581 1.40046 5.5997C1.40046 6.71358 1.84293 7.78185 2.63055 8.56948C3.41817 9.35712 4.4864 9.79961 5.60026 9.79961Z" fill="black"/></svg>
              <span className="visually-hidden">Поиск</span>
            </a>
            <Link to="/cart" className="header__services-link header__services-link--cart">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.3798 6.59316C14.3329 6.5283 14.2746 6.47622 14.209 6.44052C14.1434 6.40482 14.072 6.38633 13.9998 6.38634H10.9998V4.02272C10.9998 3.55256 10.8418 3.10167 10.5605 2.76922C10.2792 2.43677 9.89763 2.25 9.4998 2.25H6.4998C6.10198 2.25 5.72045 2.43677 5.43914 2.76922C5.15784 3.10167 4.9998 3.55256 4.9998 4.02272V6.38634H1.9998C1.92733 6.38537 1.85554 6.40303 1.78941 6.43811C1.72328 6.47318 1.6644 6.52483 1.61684 6.58947C1.56928 6.65411 1.53418 6.73019 1.51397 6.81246C1.49376 6.89472 1.48893 6.98119 1.4998 7.06588L2.4398 14.2454C2.47596 14.5272 2.59709 14.7841 2.78085 14.9687C2.96461 15.1533 3.19864 15.2531 3.4398 15.2499H12.5698C12.811 15.2531 13.045 15.1533 13.2288 14.9687C13.4125 14.7841 13.5336 14.5272 13.5698 14.2454L14.4998 7.06588C14.5098 6.98152 14.5043 6.8956 14.4836 6.814C14.4629 6.73241 14.4275 6.65707 14.3798 6.59316ZM5.9998 4.02272C5.9998 3.866 6.05248 3.7157 6.14625 3.60488C6.24002 3.49407 6.36719 3.43181 6.4998 3.43181H9.4998C9.63241 3.43181 9.75959 3.49407 9.85336 3.60488C9.94712 3.7157 9.9998 3.866 9.9998 4.02272V6.38634H5.9998V4.02272ZM12.5698 14.0681H3.4298L2.5848 7.56815H13.4148L12.5698 14.0681Z" fill="black"/></svg>
              <span className="header__cart-count">{cart.length > 0 ? cart.length : ``}</span>
              <span className="visually-hidden">Корзина</span>
            </Link>
          </section>
        </div>
      </header>
  );
}

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

Header.displayName = `Header`;

export default connect(mapStateToProps)(Header);


