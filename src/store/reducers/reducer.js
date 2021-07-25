import guitars from '../../mocks/mocks';

const InitialState = {
  guitars,
  filteredGuitars: guitars,
  cart: []
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    default: return state;
  }
};

export default reducer;
