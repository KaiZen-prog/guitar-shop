import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions/actions';
import {promocodesMock} from '../../mocks/mocks';
import {KeyCode, PromocodeAttributes} from '../../const';

const withCart = (Component) => {
  class WithCart extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        popupOpened: false,
        selectedGuitar: '',
      };

      this.onPopupOpening = this.onPopupOpening.bind(this);
      this.onPopupClosure = this.onPopupClosure.bind(this);
      this.popupCloseKeydown = this.popupCloseKeydown.bind(this);
      this.getTotalPrice = this.getTotalPrice.bind(this);
      this.getDiscount = this.getDiscount.bind(this);
      this.onApplyPromocode = this.onApplyPromocode.bind(this);
    }

    onPopupOpening(guitar) {
      this.setState({
        popupOpened: true,
        selectedGuitar: guitar,
      });
      document.addEventListener('keydown', this.popupCloseKeydown);
    }

    onPopupClosure() {
      this.setState({popupOpened: false});
      document.removeEventListener('keydown', this.popupCloseKeydown);
      document.documentElement.style.overflow = 'auto';
    }

    popupCloseKeydown(evt) {
      if (evt.keyCode === KeyCode.ESC) {
        this.onPopupClosure();
      }
    }

    getTotalPrice() {
      let result = 0;
      const guitars = Object.keys(this.props.quantityGuitarsFromCart);

      for (let i = 0; i < guitars.length; i++) {
        result += this.props.cart.find((elem) => elem.name === guitars[i]).price * this.props.quantityGuitarsFromCart[guitars[i]];
      }

      if (this.props.activePromocode.value > 0) {
        result = this.getDiscount(result);
      }

      return result;
    }

    getDiscount(totalPrice) {
      const promocode = this.props.activePromocode;

      if (promocode.type === PromocodeAttributes.PERCENT) {
        return totalPrice * (1 - promocode.value / 100);
      }

      if (promocode.type === PromocodeAttributes.VALUE) {
        let result = totalPrice - promocode.value;

        if (Object.prototype.hasOwnProperty.call(promocode, PromocodeAttributes.MAXPERCENT)) {
          result / totalPrice < (1 - promocode.maxPercent / 100) ?
              result = totalPrice * (1 - promocode.maxPercent / 100)
              :
              result = totalPrice - promocode.value;
        }

        return result;
      }
    }

    onApplyPromocode(promocode) {
        if (Object.prototype.hasOwnProperty.call(promocodesMock, promocode)) {
        this.props.applyPromocode(promocodesMock[promocode]);
      }
    }

    render() {
      const price = this.getTotalPrice();
      return (
          <Component
              {...this.props}
              popupOpened={this.state.popupOpened}
              selectedGuitar={this.state.selectedGuitar}
              totalPrice={price}
              getTotalPrice={this.getTotalPrice}
              onPopupOpening={this.onPopupOpening}
              onPopupClosure={this.onPopupClosure}
              onApplyPromocode={this.onApplyPromocode}
          />
      );
    }
  }

  const mapStateToProps = ({cart, quantityGuitarsFromCart, activePromocode}) => ({
    cart,
    quantityGuitarsFromCart,
    activePromocode,
  });

  const mapDispatchToProps = (dispatch) => ({
    removeFromCart(guitar) {
      dispatch(ActionCreator.removeFromCart(guitar));
    },

    changeQuantityGuitars(name, value) {
      dispatch(ActionCreator.changeQuantityGuitars(name, value));
    },

    applyPromocode(promocode) {
      dispatch(ActionCreator.applyPromocode(promocode));
    },
  });

  WithCart.propTypes = {
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

    quantityGuitarsFromCart: PropTypes.shape({
      model: PropTypes.number
    }).isRequired,

    activePromocode: PropTypes.shape({
      value: PropTypes.number,
      type: PropTypes.string,
      maxPercent: PropTypes.number,
    }),

    removeFromCart: PropTypes.func.isRequired,
    changeQuantityGuitars: PropTypes.func.isRequired,
    applyPromocode: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithCart);
};

export default withCart;
