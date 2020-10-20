import * as type from "./types";
import axios from "axios";

export const getItems = () => (dispatch) => {
  dispatch(loadingItem());
  axios
    .get("/api/items")
    .then((res) => dispatch({ type: type.GET_ITEMS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addItem = (todo) => (dispatch) => {
  axios.post("/api/items", { todo }).then((res) => {
    console.log("Add:", res);
    return dispatch({ type: type.ADD_ITEM, payload: { todo: res.data } });
  });
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) => dispatch({ type: type.DELETE_ITEM, payload: { id } }));
};

export const checkItem = (id) => (dispatch) => {
  axios
    .put(`/api/items/${id}`, { type: type.CHECK_ITEM })
    .then((res) => {
      console.log(res.data);
      return dispatch({ type: type.CHECK_ITEM, payload: { id } });
    })
    .catch((err) => console.log(err));
};

export const updateItem = (id, todo) => (dispatch) => {
  axios
    .put(`/api/items/${id}`, { type: type.UPDATE_ITEM, todo })
    .then((res) => {
      console.log(res.data);
      return dispatch({ type: type.UPDATE_ITEM, payload: { id, todo } });
    })
    .catch((err) => console.log(err));
};

export const loadingItem = () => {
  return {
    type: type.LOADING_ITEM,
  };
};
