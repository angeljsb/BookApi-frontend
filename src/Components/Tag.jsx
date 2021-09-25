import { useState, useEffect } from "react";
import useGet from "../Hooks/useGet";

const Tag = (props) => {
  const { children, onCancel, ...otherProps } = props;
  const name = children;
  const [parameter, setParameter] = useState({});

  useEffect(() => setParameter({ name }), [name]);

  const [loading, result, error] = useGet("tags", parameter)

  const count = (loading || error) ? <span/> : <div className="tag__count">{result.count}</div>;

  return <div className="tag" { ...otherProps }>
    <div className="tag__body">
      <span className="tag__name">{name}</span>
      {count}
      {onCancel && <button onClick={() => onCancel(name)} className="tag__cancel">x</button>}
    </div>
  </div>
}

export default Tag;
