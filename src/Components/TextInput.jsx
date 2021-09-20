import React from "react";

const TextInput = (props = {}) => {
  const { label, id, type, error, ...otherProps } = props;

  const posibleTypes = ["text", "password", "email"];

  const secureType = (type && posibleTypes.includes(type)) ? type : "text";

  return <div className={"input__container input__container--" + (error ? "error" : "success")}>
    {label && <label className="input__label" htmlFor={id}>{label}</label>}
    <input type={secureType} id={id} {...otherProps} />
    {error && <div className="input__message">{error}</div>}
  </div>
}

export default TextInput;
