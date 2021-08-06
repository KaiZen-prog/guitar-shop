import guitars from '../../mocks/mocks';
import {ActionType} from '../actions/actions';

const InitialState = {
  guitars: guitars,
  filteredGuitars: guitars,
  cart: [],
  quantityGuitarsFromCart: {},
  activePromocode: {},
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      return Object.assign({}, state, {
        cart: state.quantityGuitarsFromCart[action.payload.name] > 0 ?
            state.cart
            :
            [...state.cart, action.payload],
        quantityGuitarsFromCart: state.quantityGuitarsFromCart[action.payload.name] > 0 ?
            Object.assign({}, state.quantityGuitarsFromCart, {
              [action.payload.name]: state.quantityGuitarsFromCart[action.payload.name] + 1
            })
            :
            Object.assign({}, state.quantityGuitarsFromCart, {
              [action.payload.name]: 1,
            }),
      });
    case ActionType.REMOVE_FROM_CART:
      delete state.quantityGuitarsFromCart[action.payload.name];
      return Object.assign({}, state, {
        cart: state.cart.filter((elem) => elem !== action.payload),
        quantityGuitarsFromCart: Object.assign({}, state.quantityGuitarsFromCart),
      });
    case ActionType.CHANGE_FILTER:
      return Object.assign({}, state, {
        filteredGuitars: action.payload,
      });
    case ActionType.CHANGE_QUANTITY_GUITARS:
      return Object.assign({}, state, {
        quantityGuitarsFromCart: Object.assign({}, state.quantityGuitarsFromCart, {
          [action.payload.name]: action.payload.guitarsCount,
        }),
      });
    case ActionType.APPLY_PROMOCODE:
      return Object.assign({}, state, {
        activePromocode: action.payload,
      });
    default: return state;
  }
};

export default reducer;
