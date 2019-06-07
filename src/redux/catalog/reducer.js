import actionTypes from './actionTypes';

const initialState = {
  stock: '',
  rangeMin: '',
  rangeMax: '',
  availability: 'all', // available, not available default all
  category: null,
  sortBy: '',
  sortOrder: 1
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_FILTER: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value
      };
    }

    case actionTypes.REMOVE_FILTER: {
      const { name } = action.payload;

      return {
        ...state,
        [name]: false
      };
    }

    case actionTypes.RESET_FILTERS: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
}

export default catalogReducer;
