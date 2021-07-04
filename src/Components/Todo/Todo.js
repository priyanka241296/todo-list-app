import React, { useState, useEffect } from "react";
import Figure from "../Figure/Figure";
import Input from "../Input/Input";
import Button from "../Button/Button";

import "./Todo.css";
//to get the data from Ls
const getLocalItems = () => {
  let list = localStorage.getItem("item");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputHandler = (event) => {
    setInputData(event.target.value);
  };
  const addItems = () => {
    if (!inputData) {
      alert("Please enter the item!!!💩");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const deleteItems = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);
    setIsEditItem(id);
  };
  const removeAll = () => {
    setItems([]);
  };
  //Add data to local Storage

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <Figure />
          <div className="addItems">
            <Input onChange={inputHandler} value={inputData} />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItems}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItems(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* clear all button */}
          <div className="showItems">
            <Button className="btn effect04" onClick={removeAll}>
              <span>CHECK LIST</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
