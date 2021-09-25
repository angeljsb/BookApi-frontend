import { useState } from "react";
import { MdSearch } from "react-icons/md";
import useGet from "../Hooks/useGet";
import Accordion from "./Accordion";
import "../styles/stories.css";
import Library from "./Library";

const Search = (props = {}) => {
  const value = props.value;
  const onChange = props.onChange;
  const onSearch = props.onSearch;

  const color = props.value ? "#20c3ff" : "#dadada";
  
  const handleClick = (e) => {
      const button = e.target.closest(".stories-search__button");
      if (button) return;
      const input = e.target.querySelector(".stories-search__input")
      input && input.focus();
  };

    return <div className="stories-search" onClick={handleClick}>
    <div className="stories-search__area">
      <input type="text" name="query" value={value} onChange={onChange} id="stories" className="stories-search__input" />
      <button onClick={onSearch} className="stories-search__button" >
        <MdSearch size="2rem" color={color} />
      </button>
    </div>
  </div>;
}

const Filters = (props = {}) => {
  return <div>
    <Accordion text="Filtros">
      <p>Texto oculto</p>
    </Accordion>
  </div>;
}

const Stories = (props = {}) => {
  const [filters, setFilters] = useState({});

  const [loading, result, error] = useGet("stories", filters)

  return <div className="stories">
    <Search/>
    <Filters/>
    { (!loading && !error) && <Library stories={result.results} total={result.count}/>}
  </div>;
}

export default Stories;
