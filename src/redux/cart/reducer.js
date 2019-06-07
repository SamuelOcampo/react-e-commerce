import actionTypes from './actionTypes';

const initialState = {
  cartCount: 0,
  products: [],
  cartIds: []
};

function Product(config) {
  this.qty = 1;
  Object.assign(this, config);
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const products = [...state.products, new Product(action.payload)];
      const cartIds = [...state.cartIds, action.payload.id];
      return {
        cartCount: products.length,
        products,
        cartIds
      };
    }

    case actionTypes.REMOVE_FROM_CART: {
      const products = state.products.filter(
        product => product.id !== action.payload
      );
      const cartIds = state.cartIds.filter(id => id !== action.payload);
      return {
        cartCount: products.length,
        products,
        cartIds
      };
    }

    case actionTypes.UPDATE_PRODUCT_QTY: {
      const products = state.products.map(product => {
        if (product.id === action.payload.id) {
          product.qty = action.payload.qty;
        }
        return product;
      });
      return {
        ...state,
        products
      };
    }

    case actionTypes.CLEAR_CART: {
      return initialState;
    }

    default:
      return state;
  }
}

export default userReducer;
