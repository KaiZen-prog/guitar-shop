import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {typeOfStrings} from '../../mocks/mocks';
import {ActionCreator} from '../../store/actions/actions';
import {KeyCode, SortDirectionType, SortType} from '../../const';

const withCatalog = (Component) => {
  class WithCatalog extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        page: 1,
        sort: {
          type: ``,
          direction: ``,
        },
        filter: {
          minPrice: ``,
          maxPrice: ``,
          type: [],
          numbersOfStrings: [],
        },
        availableStrings: new Set([...typeOfStrings.electro, ...typeOfStrings.acoustic, ...typeOfStrings.ukulele]),
        popupOpened: false,
        selectedGuitar: ``,
      };

      this.onChangePage = this.onChangePage.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.onMinPriceChange = this.onMinPriceChange.bind(this);
      this.onMaxPriceChange = this.onMaxPriceChange.bind(this);
      this.onTypeChange = this.onTypeChange.bind(this);
      this.onNumbersOfStringsChange = this.onNumbersOfStringsChange.bind(this);
      this.filteringGuitars = this.filteringGuitars.bind(this);
      this.onSortTypeChange = this.onSortTypeChange.bind(this);
      this.onSortDirectionChange = this.onSortDirectionChange.bind(this);
      this.sortingGuitars = this.sortingGuitars.bind(this);
      this.onBuyButtonClick = this.onBuyButtonClick.bind(this);
      this.onAddToCart = this.onAddToCart.bind(this);
      this.onPopupClosure = this.onPopupClosure.bind(this);
      this.popupCloseKeydown = this.popupCloseKeydown.bind(this);
    }

    componentWillUnmount() {
      document.documentElement.style.overflow = `auto`;
    }

    onChangePage(evt) {
      evt.preventDefault();
      this.setState({page: Number(evt.target.name)});
    }

    onInputChange(evt) {
      const {name, value} = evt.target;

      this.setState({filter: Object.assign(
          {}, this.state.filter, {
            [name]: +value,
          }
      )});
    }

    onMinPriceChange(evt) {
      let price = +evt.target.value;

      if (price > this.state.filter.maxPrice && this.state.filter.maxPrice !== ``) {
        price = this.state.filter.maxPrice;
      }

      if (price < 0) {
        price = 0;
      }

      this.setState({filter: Object.assign(
          {}, this.state.filter, {
            minPrice: price,
          }
      )}, this.filteringGuitars);
    }

    onMaxPriceChange(evt) {
      let price = +evt.target.value;

      if (price < this.state.filter.minPrice && this.state.filter.minPrice !== ``) {
        price = this.state.filter.minPrice;
      }

      this.setState({filter: Object.assign(
          {}, this.state.filter, {
            maxPrice: price,
          }
      )}, this.filteringGuitars);
    }


    onTypeChange(evt) {
      const {checked, name} = evt.target;

      this.setState({filter: Object.assign(
          {}, this.state.filter, {
            type: checked ?
              [...this.state.filter.type, name]
              :
              this.state.filter.type.filter((elem) => elem !== name),
          }
      )}, () => {
        let availableStrings = [];

        if (this.state.filter.type.length === 0) {
          availableStrings = [...typeOfStrings.electro, ...typeOfStrings.acoustic, ...typeOfStrings.ukulele];
        } else {
          this.state.filter.type.map((elem) => {
            availableStrings = [...availableStrings, ...typeOfStrings[elem]];
          });
        }
        this.setState({availableStrings: new Set(availableStrings)}, this.filteringGuitars);
      });
    }

    onNumbersOfStringsChange(evt) {
      const {checked, name} = evt.target;
      this.setState({filter: Object.assign(
          {}, this.state.filter, {
            numbersOfStrings: checked ?
              [...this.state.filter.numbersOfStrings, name]
              :
              this.state.filter.numbersOfStrings.filter((elem) => elem !== name),
          }
      )}, this.filteringGuitars);
    }

    filteringGuitars() {
      const {minPrice, maxPrice, type, numbersOfStrings} = this.state.filter;

      const filteredGuitars = this.props.guitars.filter((elem) => {
        if (elem.price < minPrice && minPrice !== ``) {
          return false;
        }
        if (elem.price > maxPrice && maxPrice !== ``) {
          return false;
        }
        if (type.length !== 0) {
          if (type.indexOf(elem.type) < 0) {
            return false;
          }
        }
        if (numbersOfStrings.length !== 0) {
          if (numbersOfStrings.indexOf(elem.numberOfStrings.toString()) < 0) {
            return false;
          }
        }

        return true;
      });

      this.props.filteringGuitars(filteredGuitars);
      this.setState({
        page: 1,
      });
    }

    onSortTypeChange(evt) {
      this.setState({sort: Object.assign(
          {}, this.state.sort, {
            type: evt.target.value,
            direction: this.state.sort.direction === `` ? SortDirectionType.ASCENDING : this.state.sort.direction,
          }
      )}, this.sortingGuitars);
    }

    onSortDirectionChange(evt) {
      this.setState({sort: Object.assign(
          {}, this.state.sort, {
            type: this.state.sort.type === `` ? SortType.PRICE : this.state.sort.type,
            direction: evt.target.value,
          }
      )}, this.sortingGuitars);
    }

    sortingGuitars() {
      const {type, direction} = this.state.sort;

      let sortGuitars = this.props.filteredGuitars.sort((a, b) => {
        if (a[type] < b[type]) {
          return -1;
        }
        if (a[type] > b[type]) {
          return 1;
        }
        return 0;
      }).slice();

      direction === SortDirectionType.DESCENDING ? sortGuitars = sortGuitars.reverse() : sortGuitars = sortGuitars;

      this.props.filteringGuitars(sortGuitars);
    }

    onBuyButtonClick(guitar) {
      this.setState({
        popupOpened: `confirm`,
        selectedGuitar: guitar,
      });
      document.addEventListener(`keydown`, this.popupCloseKeydown);
      document.documentElement.style.overflow = `hidden`;
    }

    onAddToCart() {
      this.setState({popupOpened: `success`});
    }

    onPopupClosure() {
      this.setState({popupOpened: false});
      document.removeEventListener(`keydown`, this.popupCloseKeydown);
      document.documentElement.style.overflow = `auto`;
    }

    popupCloseKeydown(evt) {
      if (evt.keyCode === KeyCode.ESC) {
        this.onPopupClosure();
      }
    }

    render() {
      return (
        <Component
          state={this.state}
          guitars={this.props.filteredGuitars}
          onChangePage={this.onChangePage}
          onInputChange={this.onInputChange}
          onMinPriceChange={this.onMinPriceChange}
          onMaxPriceChange={this.onMaxPriceChange}
          onTypeChange={this.onTypeChange}
          onNumbersOfStringsChange={this.onNumbersOfStringsChange}
          onSortTypeChange={this.onSortTypeChange}
          onSortDirectionChange={this.onSortDirectionChange}
          onBuyButtonClick={this.onBuyButtonClick}
          onAddToCart={this.onAddToCart}
          onPopupClosure={this.onPopupClosure}
        />
      );
    }
  }

  const mapStateToProps = ({guitars, filteredGuitars, cart}) => ({
    guitars,
    filteredGuitars,
    cart,
  });

  const mapDispatchToProps = (dispatch) => ({
    filteringGuitars(guitars) {
      dispatch(ActionCreator.changeFilter(guitars));
    },

    addToCart(guitar) {
      dispatch(ActionCreator.addToCart(guitar));
    },
  });

  WithCatalog.propTypes = {
    guitars: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          vendorCode: PropTypes.string.isRequired,
          photo: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          rating: PropTypes.number.isRequired,
          numberOfReviews: PropTypes.number.isRequired,
        })
    ).isRequired,
    filteredGuitars: PropTypes.arrayOf(
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
    filteringGuitars: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithCatalog);
};

export default withCatalog;
