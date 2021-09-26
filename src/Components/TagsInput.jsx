import { useState } from "react";
import Tag from "./Tag";
import "../styles/tags-input.css";

const TagsInput = (props = {}) => {
  const { tags, onAdd, onCancel, ...otherProps } = props;
  const realTags = tags || [];

  const handleKeyUp = (e) => {
    const value = e.target.value;
    const key = e.key;
    if (key !== "Enter" || !value) return;
    onAdd(value);
    e.target.value = "";
  }

  const handleClick = (e) => {
    const input = e.target.querySelector(".tags-input__input");
    input?.focus();
  }

  return <div className="tags-input" onClick={handleClick}>
    {realTags.map((name, index) => <Tag key={index} onCancel={onCancel}>{name}</Tag>)}
    <input className="tags-input__input" type="text" name="tagName" maxLength="20" onKeyUp={handleKeyUp} { ...otherProps } />
  </div>
}

export default TagsInput;
