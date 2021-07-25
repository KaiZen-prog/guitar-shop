import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="#" className="header__logo"></a>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
              <a className="header__nav-link" href="#">Автомобили</a>
            </li>
            <li>
              <a className="header__nav-link" href="#">Контакты</a>
            </li>
            <li>
              <a className="header__nav-link header__nav-link--current" href="#">Услуги</a>
            </li>
            <li>
              <a className="header__nav-link" href="#">Вакансии</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = `Header`;

export default Header;
