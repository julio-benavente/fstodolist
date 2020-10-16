import React, { useState, useEffect, Fragment, useRef } from "react";
import "./Body.scss";
import { connect } from "react-redux";
import { deleteItem } from "../../store/actions/itemActions";

const Body = (props) => {
  const { items, setItems, deleteItem } = props;

  const [itemsToComplete, setItemsToComplete] = useState([]);
  const [itemsCompleted, setItemsCompleted] = useState([]);

  useEffect(() => {
    if (items) {
      setItemsToComplete(() => items.filter((e) => e.checked == false));
      setItemsCompleted(() => items.filter((e) => e.checked == true));
    }
  }, [items]);

  return (
    <div className="body">
      <ul className="toComplete itemsList">
        {itemsToComplete.length
          ? itemsToComplete.map((item) => (
              <ItemToComplete
                item={item}
                items={items}
                setItems={setItems}
                deleteItem={deleteItem}
              />
            ))
          : null}
      </ul>

      <ul className="completed itemsList">
        {itemsCompleted.length
          ? itemsCompleted.map((item) => (
              <ItemCompleted
                item={item}
                items={items}
                setItems={setItems}
                deleteItem={deleteItem}
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

export default connect(mapStateToProps, { deleteItem })(Body);

const ItemToComplete = (props) => {
  const { item, items, setItems, deleteItem } = props;
  const { todo, id } = item;

  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState("");
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
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, todo: inputRef.current.value } : item
      )
    );

    setEdit(!edit);
  };

  const handleDetele = () => {
    deleteItem(id);
  };

  const handleCheck = () => {
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, checked: !item.checked } : item
      )
    );
  };

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
  const { item, items, setItems, deleteItem } = props;
  const { todo, id } = item;

  const handleDetele = () => {
    deleteItem(id);
  };

  const handleCheck = () => {
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, checked: !item.checked } : item
      )
    );
  };

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
