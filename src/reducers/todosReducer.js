const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_TODO_SUCCESS':
      return payload;

    case 'ADD_TODO_SUCCESS':
      return [...state, payload];

    default:
      return state;
  }
};
