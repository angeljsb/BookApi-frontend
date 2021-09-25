import { useState } from "react";
import Tag from "./Tag";
import "../styles/tags-input.css";

const TagsInput = (props = {}) => {
  const { /*tags, onAdd, onCancel,*/ ...otherProps } = props;
  //const realTags = tags || [];
  const [realTags, setRealTags] = useState([]);

  const onAdd = (name) => {
    const [...newTags] = realTags;
    newTags.includes(name) || newTags.push(name);
    setRealTags(newTags);
  }

  const onCancel = (name) => {
    const [...newTags] = realTags;
    const index = newTags.indexOf(name);
    if (index > -1) {
      newTags.splice(index, 1);
      setRealTags(newTags);
    }
  }

  const handleKeyUp = (e) => {
    const value = e.target.value;
    const key = e.key;
    if (key !== "Enter" || !value) return;
    onAdd(value);
    e.target.value = "";
  }

  return <div className="tags-input">
    {realTags.map((name, index) => <Tag key={index} onCancel={onCancel}>{name}</Tag>)}
    <input className="tags-input__input" type="text" name="tagName" maxLength="20" onKeyUp={handleKeyUp} { ...otherProps } />
  </div>
}

export default TagsInput;
