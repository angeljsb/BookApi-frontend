import { Check } from "./Globals.jsx";
import "../styles/check-list.css";

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

export default CheckList;
