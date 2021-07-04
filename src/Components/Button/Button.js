import React from "react";

const Button = (props) => {
  return (
    <button
      className={props.className}
      data-sm-link-text="Remove All"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
