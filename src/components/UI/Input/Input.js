import React from "react";
import classes from "./Input.module.css";

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
};

const Input = props => {
  const cls = [classes.Input];
  const inputType = props.type || "text";
  if (isInvalid(props)) cls.push(classes.invalid);

  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      ></input>
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Fill the form"}</span>
      ) : null}
    </div>
  );
};

export default Input;
