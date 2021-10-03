import { Check, Tag, Spinner } from "./Globals.jsx";
import "../styles/check-list.css";
import "../styles/tags-input.css";
import "../styles/text-input.css";
import useGet from "../Hooks/useGet.jsx";

const CheckList = (props = {}) => {
  const options = props.options || [];
  const value = props.value || [];
  const name = props.name || "";

  const handleClickItem = (e) => {
    const item = e.target.closest(".check-list__item");
    const setSelected = props.onChange;
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
                  name={name}
                  value={option.name}
                  type="checkbox"
                  checked={value.includes(option.id)}
                ></Check>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GenresCheckList = (props = {}) => {
  const { loading, result, error } = useGet("genres");

  return (
    <div>
      {loading && (
        <div className="stories__load-message">
          <Spinner size="x-small" /> Buscando los géneros
        </div>
      )}
      {!loading && error && (
        <span className="stories__error-message">
          Falló en obtener los generos
        </span>
      )}
      {result && <CheckList name="genres" options={result} {...props} />}
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
    e.preventDefault();
    onAdd(value);
    e.target.value = "";
  };

  const preventSubmit = (e) => {
    const key = e.key;
    if (key !== "Enter") return;
    e.preventDefault();
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
        onKeyDown={preventSubmit}
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

export { CheckList, GenresCheckList, TagsInput, TextInput };
