import { Check, Tag } from "./Globals.jsx";
import "../styles/check-list.css";
import "../styles/tags-input.css";
import "../styles/text-input.css";

const CheckList = (props = {}) => {
  const options = props.options || [];
  const selected = props.selected || [];

  const handleClickItem = (e) => {
    const item = e.target.closest(".check-list__item");
    const setSelected = props.onClickItem;
    if (!item || !setSelected) return;
    const id = JSON.parse(item.dataset.id);
    setSelected(id);
  };

  return (
    <div className="check-list">
      <ul className="check-list__list">
        {options.map((option) => (
          <li key={option.id} data-id={option.id} className="check-list__item">
            <label
              htmlFor={`check-list-item-${option.id}`}
              className="check-list__item-content"
            >
              <div className="check-list__name">{option.name}</div>
              <div className="check-list__check">
                <Check
                  onChange={handleClickItem}
                  id={`check-list-item-${option.id}`}
                  readOnly
                  name={option.name}
                  type="checkbox"
                  checked={selected.includes(option.id)}
                ></Check>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TagsInput = (props = {}) => {
  const { tags, onAdd, onCancel, ...otherProps } = props;
  const realTags = tags || [];

  const handleKeyUp = (e) => {
    const value = e.target.value;
    const key = e.key;
    if (key !== "Enter" || !value) return;
    onAdd(value);
    e.target.value = "";
  };

  const handleClick = (e) => {
    const input = e.target.querySelector(".tags-input__input");
    input?.focus();
  };

  return (
    <div className="tags-input" onClick={handleClick}>
      {realTags.map((name, index) => (
        <Tag key={index} onCancel={onCancel}>
          {name}
        </Tag>
      ))}
      <input
        className="tags-input__input"
        type="text"
        name="tagName"
        maxLength="20"
        onKeyUp={handleKeyUp}
        {...otherProps}
      />
    </div>
  );
};

const TextInput = (props = {}) => {
  const { label, id, type, error, ...otherProps } = props;

  const posibleTypes = ["text", "password", "email"];

  const secureType = type && posibleTypes.includes(type) ? type : "text";

  const success = (!props.required || props.value) && !error;
  let containerClasses = "input__container";
  if (success || error) {
    containerClasses += ` input__container--${success ? "success" : "error"}`;
  }

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="input__area"
        type={secureType}
        id={id}
        {...otherProps}
      />
      {error && <div className="input__message">{error}</div>}
    </div>
  );
};

export { CheckList, TagsInput, TextInput };
