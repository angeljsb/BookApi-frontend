import React from "react";
import '../styles/text-input.css';

const TextInput = (props = {}) => {
  const { label, id, type, error, ...otherProps } = props;

  const posibleTypes = ["text", "password", "email"];

  const secureType = (type && posibleTypes.includes(type)) ? type : "text";

  const success = (!props.required || props.value) && !error;
  let containerClasses = "input__container";
  if (success || error) {
    containerClasses += ` input__container--${success ? "success" : "error"}`;
  }

  return <div className={containerClasses}>
    {label && <label className="input__label" htmlFor={id}>{label}</label>}
    <input className="input__area" type={secureType} id={id} {...otherProps} />
    {error && <div className="input__message">{error}</div>}
  </div>
}

export default TextInput;
