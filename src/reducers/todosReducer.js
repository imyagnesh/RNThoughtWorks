const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_TODO_SUCCESS':
      return payload;

    case 'ADD_TODO_SUCCESS':
      return [...state, payload];

    case 'UPDATE_TODO_SUCCESS': {
      const index = state.findIndex(x => x.id === payload.id);
      return [...state.slice(0, index), payload, ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};
