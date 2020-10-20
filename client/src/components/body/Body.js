import React, { useState, useEffect, Fragment, useRef } from "react";
import "./Body.scss";
import { connect } from "react-redux";
import {
  deleteItem,
  checkItem,
  updateItem,
} from "../../store/actions/itemActions";

const Body = (props) => {
  const {
    item: { items },
    deleteItem,
    updateItem,
    checkItem,
  } = props;

  const [itemsToComplete, setItemsToComplete] = useState([]);
  const [itemsCompleted, setItemsCompleted] = useState([]);

  useEffect(() => {
    if (items) {
      setItemsToComplete(() => items.filter((e) => e.checked === false));
      setItemsCompleted(() => items.filter((e) => e.checked === true));
    }
  }, [items]);

  return (
    <div className="body">
      <ul className="toComplete itemsList">
        {itemsToComplete.length
          ? itemsToComplete.map((item) => (
              <ItemToComplete
                item={item}
                deleteItem={deleteItem}
                updateItem={updateItem}
                checkItem={checkItem}
              />
            ))
          : null}
      </ul>

      <ul className="completed itemsList">
        {itemsCompleted.length
          ? itemsCompleted.map((item) => (
              <ItemCompleted
                item={item}
                deleteItem={deleteItem}
                checkItem={checkItem}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { deleteItem, updateItem, checkItem })(
  Body
);

const ItemToComplete = (props) => {
  const { item, deleteItem, updateItem, checkItem } = props;
  const { _id } = item;

  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  const handleEdit = (e) => {
    switch (e) {
      case "edit":
        setEdit(!edit);
        break;
      case "cancel":
        setEdit(!edit);
        break;
      case "save":
        saveEdit();
        break;
      default:
        break;
    }
  };

  const saveEdit = () => {
    updateItem(_id, inputRef.current.value);
    setEdit(!edit);
  };

  const handleDetele = () => deleteItem(_id);

  const handleCheck = () => checkItem(_id);

  return (
    <li className="todoItem">
      <button class="btn check" onClick={handleCheck}>
        <i class="fas fa-check"></i>
      </button>
      {!edit ? (
        <p className="todo">{item.todo}</p>
      ) : (
        <input ref={inputRef} type="text" className="inputEdit" />
      )}
      <div class="buttons">
        {!edit ? (
          <Fragment>
            <button class="btn remove" onClick={handleDetele}>
              <i class="far fa-trash-alt"></i>
            </button>
            <button className="btn edit" onClick={() => handleEdit("edit")}>
              <i class="fas fa-edit"></i>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button class="btn cancel" onClick={() => handleEdit("cancel")}>
              <i class="far fa-times-circle"></i>
            </button>
            <button
              className="btn checkCircle"
              onClick={() => handleEdit("save")}
            >
              <i class="fas fa-check-circle"></i>
            </button>
          </Fragment>
        )}
      </div>
    </li>
  );
};

const ItemCompleted = (props) => {
  const { item, deleteItem, checkItem } = props;
  const { todo, _id } = item;

  const handleDetele = () => deleteItem(_id);

  const handleCheck = () => checkItem(_id);

  return (
    <li className="todoItem">
      <button class="btn check" onClick={handleCheck}>
        <i class="fas fa-check"></i>
      </button>
      <p className="todo">{todo}</p>
      <div class="buttons">
        <button class="btn remove" onClick={handleDetele}>
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
};
