import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import "./Header.scss";

const Header = (props) => {
  const { items, setItems } = props;

  const [newItem, setNewItem] = useState("");
  const refAddInput = useRef(null);

  const handleInput = (e) => {
    setNewItem(e);
  };

  const addItem = (todo) => {
    const newTodo = {
      id: uuid(),
      checked: false,
      todo,
      date: new Date(),
    };

    refAddInput.current.value = null;
    setItems([...items, newTodo]);
  };

  return (
    <div className="header">
      <input
        ref={refAddInput}
        type="text"
        placeholder="Enter an activity..."
        className="inputNewItem"
        onChange={(e) => handleInput(e.target.value)}
      />
      <button className="addBtn" onClick={() => addItem(newItem)}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Header;
