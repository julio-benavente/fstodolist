import * as type from "../actions/types";
import { v4 as uuid } from "uuid";

const initialState = {
  items: [
    {
      id: uuid(),
      todo: "Todo to complete",
      checked: false,
      date: new Date(),
    },
    {
      id: uuid(),
      todo: "Todo completed",
      checked: true,
      date: new Date(),
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case type.GET_ITEMS:
      return {
        ...state,
      };
    case type.ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: uuid(),
            todo: action.payload.todo,
            checked: false,
            date: new Date(),
          },
        ],
      };
    case type.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case type.CHECK_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id == action.payload.id
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    case type.UPDATE_ITEM:
      console.log("id:", action.payload.id, "\ntodo:", action.payload.todo);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id == action.payload.id
            ? { ...item, todo: action.payload.todo }
            : item
        ),
      };
    default:
      return state;
  }
}
