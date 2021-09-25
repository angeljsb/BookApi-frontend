import Check from "./Check.jsx";
import "../styles/check-list.css";

const CheckList = (props = {}) => {
  const options = [{ id: 1, name: "Acción" }, { id: 2, name: "Comedia" }]
  //const [loading ,options, error] = useGet("genres");
  const selected = props.selected || [];

  const handleClickItem = (e) => {
    const item = e.target.closest(".check-list__item");
    const setSelected = props.onClickItem;
    if (!item || !setSelected) return;
    const id = JSON.parse(item.dataset.id);
    setSelected(id);
  }

  return <div className="check-list" onClick={handleClickItem}>
    <ul className="check-list__list">
      {options.map((option) => <li key={option.id} data-id={option.id} className="check-list__item">
        <div className="check-list__item-content">
          <div className="check-list__name">{option.name}</div>
          <div className="check-list__check">
            <Check id={option.id} name={option.name} type="checkbox" checked={selected.includes(option.id)}></Check>
          </div>
        </div>
      </li>)}
    </ul>
  </div>
}

export default CheckList;