import * as type from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case type.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case type.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload.todo],
      };
    case type.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.id),
      };
    case type.CHECK_ITEM:
      console.log(type.CHECK_ITEM);
      return {
        ...state,
        items: state.items.map((item) => {
          return item._id === action.payload.id
            ? { ...item, checked: !item.checked }
            : item;
        }),
      };
    case type.UPDATE_ITEM:
      console.log(action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.id
            ? { ...item, todo: action.payload.todo }
            : item
        ),
      };
    case type.LOADING_ITEM:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
