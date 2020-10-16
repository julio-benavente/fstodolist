import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    {
      id: 14123,
      todo: "Este esta hecho",
      checked: true,
      date: new Date(),
    },
    {
      id: 1234,
      todo: "Prueba de checked",
      checked: false,
      date: new Date(),
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}
