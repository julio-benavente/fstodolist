import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import { connect } from "react-redux";
import { getItems } from "./store/actions/itemActions";

function App(props) {
  const {
    getItems,
    item: { items: todos },
  } = props;

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setItems(todos);
  }, [todos]);

  return (
    <div className="App">
      <Header items={items} setItems={setItems} />
      <Body items={items} setItems={setItems} />
    </div>
  );
}

const mapStateToProps = (state) => ({ item: state.item });

export default connect(mapStateToProps, { getItems })(App);
