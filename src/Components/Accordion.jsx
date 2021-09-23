import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "../styles/accordion.css";

const Accordion = (props = {}) => {
  const children = props.children;
  const text = props.text;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return <div className={`accordion accordion--${open ? "open" : "close"}`} { ...props }>
    <div className="accordion__button" onClick={toggleOpen}>
      <p className="accordion__text">{text}</p>
      <div className="accordion__icon">
        {open ? <MdKeyboardArrowUp/>: <MdKeyboardArrowDown/>}
      </div>
    </div>
    <div className="accordion__container">
      {children}
    </div>
  </div>;
}

export default Accordion;
