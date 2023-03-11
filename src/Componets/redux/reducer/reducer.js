const INTIAL_STATE = {
  carts: [],
  search: '',
};
export const cartreducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD-CART':
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
        return {
          ...state,
          carts: [...state.carts],
        };
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }
    case 'DLT-CART':
      const data = state.carts.filter((item) => item.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    case 'DLTOne-CART':
      const IteamIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (state.carts[IteamIndex_dec].qnty > 1) {
        state.carts[IteamIndex_dec].qnty -= 1;
        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[IteamIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload.id);

        return {
          ...state,
          carts: data,
        };
      }
    case 'Search_item':
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};
