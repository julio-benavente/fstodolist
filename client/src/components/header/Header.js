import React, { useRef } from "react";
import "./Header.scss";
import { connect } from "react-redux";
import { addItem } from "../../store/actions/itemActions";

const Header = (props) => {
  const { addItem } = props;

  const refAddInput = useRef(null);

  const handleAdd = () => {
    let input = refAddInput.current.value;
    addItem(input);
    refAddInput.current.value = null;
  };

  return (
    <div className="header">
      <input
        ref={refAddInput}
        type="text"
        placeholder="Enter an activity..."
        className="inputNewItem"
      />
      <button className="addBtn" onClick={handleAdd}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default connect(null, { addItem })(Header);
