import React from 'react';
import PropTypes from 'prop-types';
import withCatalog from '../../hocs/with-catalog/with-catalog';
import {Repeat} from '../../utils/common';
import ProductCard from '../product-card/product-card';
import AddToCartPopup from '../add-to-cart-popup/add-to-cart-popup';
import ChangeCartPopup from '../change-cart-popup/change-cart-popup';
import {NUMBER_OF_ITEMS_TO_PAGE, SortDirectionType, SortType, PopupStates, PopupActionTypes} from '../../const';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Pagination from '../pagination/pagination';

const Catalog = (props) => {
  const {
    state,
    guitars,
    onInputChange,
    onChangePage,
    onMinPriceChange,
    onMaxPriceChange,
    onTypeChange,
    onNumbersOfStringsChange,
    onSortTypeChange,
    onSortDirectionChange,
    onBuyButtonClick,
    onAddToCart,
    onPopupClosure
  } = props;

  const {
    page,
    filter,
    sort,
    availableStrings,
    popupOpened,
    selectedGuitar
  } = state;

  const {minPrice, maxPrice} = filter;

  return (
      <section className="catalog container">
        <h1 className="catalog__title">Каталог гитар</h1>
        <Breadcrumbs additionalClass="catalog__breadcrumbs" pathChain={[{name: 'Главная', link: '#'}, {name: 'Каталог'}]}/>

        <div className="catalog__flex-container">
          <form action="#" className="catalog__filter">
            <h2 className="catalog__filter-title">Фильтр</h2>

            <fieldset className="catalog__filter-field">
              <h3 className="catalog__filter-field-title">Цена, ₽</h3>
              <div className="catalog__filter-price">
                <input
                    type="number"
                    name="minPrice"
                    className="catalog__input catalog__input--min-price"
                    min="0" placeholder="1 000"
                    onChange={onInputChange}
                    onBlur={onMinPriceChange}
                    value={minPrice}
                />

                <input
                    type="number"
                    name="maxPrice"
                    className="catalog__input catalog__input--max-price"
                    min="0" placeholder="30 000"
                    onChange={onInputChange}
                    onBlur={onMaxPriceChange}
                    value={maxPrice}
                />
              </div>
            </fieldset>

            <fieldset className="catalog__filter-field catalog__filter-field--guitar-type">
              <h3 className="catalog__filter-field-title">Тип гитар</h3>

              <ul className="catalog__filter-list">
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input type="checkbox" name="acoustic" className="catalog__filter-checkbox" onChange={onTypeChange} />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">Акустические гитары</span>
                  </label>
                </li>
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input type="checkbox" name="electro" className="catalog__filter-checkbox" onChange={onTypeChange} />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">Электрогитары</span>
                  </label>
                </li>
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input type="checkbox" name="ukulele" className="catalog__filter-checkbox" onChange={onTypeChange} />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">Укулеле</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset className="catalog__filter-field">
              <h3 className="catalog__filter-field-title">Количество струн</h3>

              <ul className="catalog__filter-list">
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input
                        type="checkbox"
                        name="4"
                        className="catalog__filter-checkbox"
                        onChange={onNumbersOfStringsChange}
                        disabled={
                          availableStrings.has('4')
                            ? ''
                            : 'disabled'
                        }
                    />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">4</span>
                  </label>
                </li>
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input
                        type="checkbox"
                        name="6"
                        className="catalog__filter-checkbox"
                        onChange={onNumbersOfStringsChange}
                        disabled={
                          availableStrings.has('6')
                              ? ''
                              : 'disabled'
                        }
                    />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">6</span>
                  </label>
                </li>
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input
                        type="checkbox"
                        name="7"
                        className="catalog__filter-checkbox"
                        onChange={onNumbersOfStringsChange}
                        disabled={availableStrings.has('7')
                            ? ''
                            : 'disabled'
                        }
                    />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">7</span>
                  </label>
                </li>
                <li className="catalog__filter-item">
                  <label className="catalog__label-checkbox">
                    <input
                        type="checkbox"
                        name="12"
                        className="catalog__filter-checkbox"
                        onChange={onNumbersOfStringsChange}
                        disabled={availableStrings.has('12')
                            ? ''
                            : 'disabled'
                        }
                    />
                    <span className="catalog__custom-checkbox"></span>
                    <span className="catalog__checkbox-value">12</span>
                  </label>
                </li>
              </ul>
            </fieldset>

          </form>
          <div className="catalog__content-container">
            <div className="catalog__sorting">
              <h2 className="catalog__sorting-title">Сортировать:</h2>

              <ul className="catalog__sorting-list">
                <li tabIndex="0" className="catalog__sorting-item">
                  <input
                      id="sort-price"
                      type="radio"
                      name="type"
                      className="visually-hidden"
                      value={SortType.PRICE}
                      onChange={onSortTypeChange}
                  />
                  <label htmlFor="sort-price">по цене</label>
                </li>
                <li tabIndex="0" className="catalog__sorting-item">
                  <input
                      id="sort-popular"
                      type="radio"
                      name="type"
                      className="visually-hidden"
                      value={SortType.NUMBER_OF_REVIEWS}
                      onChange={onSortTypeChange}
                  />
                  <label htmlFor="sort-popular">по популярности</label>
                </li>
              </ul>
              <div className="catalog__sorting-direction">
                <input
                    id="sort-ascending"
                    type="radio"
                    name="direction"
                    value={SortDirectionType.ASCENDING}
                    className="catalog__sorting-direction-input visually-hidden"
                    onChange={onSortDirectionChange}
                    disabled={sort.direction === SortDirectionType.ASCENDING ? 'disabled' : ''}
                />
                <label htmlFor="sort-ascending" className="catalog__sorting-direction-item catalog__sorting-direction-item--ascending">
                  <span className="visually-hidden">По возрастанию</span>
                </label>

                <input
                    id="sort-descending"
                    type="radio"
                    name="direction"
                    value={SortDirectionType.DESCENDING}
                    className="catalog__sorting-direction-input visually-hidden"
                    onChange={onSortDirectionChange}
                    disabled={sort.direction === SortDirectionType.DESCENDING ? 'disabled' : ''}
                />
                <label htmlFor="sort-descending" className="catalog__sorting-direction-item catalog__sorting-direction-item--descending">
                  <span className="visually-hidden">По убыванию</span>
                </label>
              </div>
            </div>

            <ul className="catalog__list">
              <Repeat numTimes={guitars.slice((page - 1) * NUMBER_OF_ITEMS_TO_PAGE, (page * NUMBER_OF_ITEMS_TO_PAGE)).length}>
                {(i) => (
                    <ProductCard
                        key={i}
                        product={guitars[(page - 1) * NUMBER_OF_ITEMS_TO_PAGE + i]}
                        onBuyButtonClick={onBuyButtonClick}
                    />
                )}
              </Repeat>
            </ul>

            <Pagination
                page={page}
                numberOfPages={guitars.length === 0
                  ? 1
                  : Math.ceil(guitars.length / NUMBER_OF_ITEMS_TO_PAGE)}
                onChangePage={onChangePage}
            />
          </div>
        </div>

        {popupOpened === PopupStates.CONFIRM && (
            <ChangeCartPopup
                actionType={PopupActionTypes.ADD}
                product={selectedGuitar}
                onAddToCart={onAddToCart}
                onPopupClosure={onPopupClosure}
            />
        )}
        {popupOpened === PopupStates.SUCCESS && (
            <AddToCartPopup onPopupClosure={onPopupClosure}/>
        )}
      </section>
  );
};

Catalog.propTypes = {
  state: PropTypes.shape({
    page: PropTypes.number.isRequired,
    sort: PropTypes.shape({
      type: PropTypes.string.isRequired,
      direction: PropTypes.string.isRequired,
    }).isRequired,
    filter: PropTypes.shape({
      minPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      maxPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      type: PropTypes.array.isRequired,
      numbersOfStrings: PropTypes.array.isRequired,
    }).isRequired,
    availableStrings: PropTypes.object.isRequired,
    popupOpened: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
    selectedGuitar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,

  guitars: PropTypes.arrayOf(
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

  onInputChange: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onNumbersOfStringsChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onSortDirectionChange: PropTypes.func.isRequired,
  onBuyButtonClick: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPopupClosure: PropTypes.func.isRequired,
};

Catalog.displayName = 'Catalog';

export default withCatalog(Catalog);
