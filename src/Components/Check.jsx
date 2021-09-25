import "../styles/check.css";
import { MdDone } from "react-icons/md";

const Check = (props = { type: "checkbox" }) => {
  const { type, name, id, ...otherProps } = props;

  const realType = (type === "checkbox" || type === "radio")
      ? type : "checkbox";
      
  return <div className={`check check--${realType}`}>
    <input className="check__input" type={realType} name={name} id={id} { ...otherProps } />
    <label htmlFor={id} className="check__label">
      <div className="check__mark">
        <MdDone className="check__icon" color="white"/>
      </div>
    </label>
  </div>
}

export default Check;
