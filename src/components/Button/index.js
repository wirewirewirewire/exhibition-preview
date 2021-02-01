import React from "react";
import styles from "./styles.module.scss";

const Button = props => {
  return (
    <button
      {...props}
      className={`${props.kind ? styles[props.kind] : styles.button} ${
        props.className
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
