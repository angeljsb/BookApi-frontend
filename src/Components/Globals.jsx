import { useState } from "react";
import useGet from "../Hooks/useGet";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdDone } from "react-icons/md";
import "../styles/accordion.css";
import "../styles/check.css";
import "../styles/spinner.css";
import "../styles/genres-tags.css";
import "../styles/rating.css";

const Accordion = (props = {}) => {
  const children = props.children;
  const text = props.text;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div
      className={`accordion accordion--${open ? "open" : "close"}`}
      {...props}
    >
      <div className="accordion__button" onClick={toggleOpen}>
        <p className="accordion__text">{text}</p>
        <div className="accordion__icon">
          {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      <div className="accordion__container">{children}</div>
    </div>
  );
};

const Check = (props = { type: "checkbox" }) => {
  const { type, name, id, ...otherProps } = props;

  const realType = type === "checkbox" || type === "radio" ? type : "checkbox";

  return (
    <div className={`check check--${realType}`}>
      <input
        className="check__input"
        type={realType}
        name={name}
        id={id}
        {...otherProps}
      />
      <label htmlFor={id} className="check__label">
        <div className="check__mark">
          <MdDone className="check__icon" color="white" />
        </div>
      </label>
    </div>
  );
};

const Logo = (props = {}) => {
  return (
    <div className="logo">
      <h1 className="logo__text" {...props}>
        BookZone
      </h1>
    </div>
  );
};

const Spinner = (props = {}) => {
  const size = props.size || "x-small";

  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};

const Tag = (props) => {
  const { children, onCancel, ...otherProps } = props;
  const name = children;

  const { loading, result, error } = useGet("tags", { name });

  const count =
    loading || error ? (
      <span />
    ) : (
      <div className="tag__count">{result.storiesCount}</div>
    );

  return (
    <div className="tag" {...otherProps}>
      <div className="tag__body">
        <span className="tag__name">{name}</span>
        {count}
        {onCancel && (
          <button onClick={() => onCancel(name)} className="tag__cancel">
            x
          </button>
        )}
      </div>
    </div>
  );
};

const Genre = (props = {}) => {
  const { id, name, ...otherProps } = props.genre;

  return (
    <div className="genre" {...otherProps}>
      {name}
    </div>
  );
};

const Rating = (props = {}) => {
  const { rating, ...otherProps } = props;

  const stars = (rating) => {
    let rest = rating;
    const stars = [];
    const size = "1rem";
    const color = "#ffd10f";

    for (let i = 0; i < 5; i++) {
      const attributes = {
        color,
        size,
        key: i,
      };
      if (rest >= 1) {
        stars.push(<ImStarFull {...attributes} />);
        rest -= 1;
        continue;
      }
      if (rest >= 0.5) {
        stars.push(<ImStarHalf {...attributes} />);
        rest = 0;
        continue;
      }
      stars.push(<ImStarEmpty {...attributes} />);
    }

    return stars;
  };

  return <div className="ratings">{stars(rating)}</div>;
};

export { Accordion, Check, Logo, Spinner, Tag, Genre, Rating };
