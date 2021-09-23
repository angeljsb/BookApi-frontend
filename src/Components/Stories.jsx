import { MdSearch } from "react-icons/md";
import Accordion from "./Accordion";
import "../styles/stories.css";

const Search = (props = {}) => {
  const value = props.value;
  const onChange = props.onChange;
  const onSearch = props.onSearch;

  const color = props.value ? "#20c3ff" : "#dadada";

  return <div className="stories-search">
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
  return <div className="stories">
    <Search/>
    <Filters/>
  </div>;
}

export default Stories;
