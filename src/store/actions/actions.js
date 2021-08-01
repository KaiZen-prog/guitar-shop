export const ActionType = {
  ADD_TO_CART: `addToCart`,
  REMOVE_FROM_CART: `removeFromCart`,
  CHANGE_FILTER: `changeFilter`,
  CHANGE_QUANTITY_GUITARS: `changeQuantityGuitars`,
  APPLY_PROMOCODE: `applyPromocode`,
}

export const ActionCreator = {
  addToCart: (item) => ({
    type: ActionType.ADD_TO_CART,
    payload: item,
  }),

  removeFromCart: (item) => ({
    type: ActionType.REMOVE_FROM_CART,
    payload: item,
  }),

  changeFilter: (items) => ({
    type: ActionType.CHANGE_FILTER,
    payload: items,
  }),

  changeQuantityGuitars: (name, guitarsCount) => ({
    type: ActionType.CHANGE_QUANTITY_GUITARS,
    payload: {name, guitarsCount},
  }),

  applyPromocode: (promocode) => ({
    type: ActionType.APPLY_PROMOCODE,
    payload: promocode,
  }),
}
