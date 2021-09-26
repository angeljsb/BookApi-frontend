import "../styles/spinner.css";

const Spinner = (props = {}) => {
  const size = props.size || "x-small";

  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default Spinner;
