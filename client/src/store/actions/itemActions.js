import * as type from "./types";

export const getItems = () => {
  return {
    type: type.GET_ITEMS,
  };
};

export const addItem = (todo) => {
  return {
    type: type.ADD_ITEM,
    payload: { todo },
  };
};

export const deleteItem = (id) => {
  return {
    type: type.DELETE_ITEM,
    payload: { id },
  };
};

export const checkItem = (id) => {
  return {
    type: type.CHECK_ITEM,
    payload: { id },
  };
};

export const updateItem = (id, todo) => {
  return {
    type: type.UPDATE_ITEM,
    payload: { id, todo },
  };
};
