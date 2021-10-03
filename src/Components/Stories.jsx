import { useState } from "react";
import { MdSearch } from "react-icons/md";
import useGet from "../Hooks/useGet";
import { Accordion, Check, Spinner } from "./Globals.jsx";
import { GenresCheckList, TagsInput } from "./Input.jsx";
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
    const input = e.target.querySelector(".stories-search__input");
    input && input.focus();
  };

  return (
    <div className="stories-search" onClick={handleClick}>
      <div className="stories-search__area">
        <input
          type="text"
          name="query"
          value={value}
          onChange={onChange}
          id="stories"
          className="stories-search__input"
        />
        <button onClick={onSearch} className="stories-search__button">
          <MdSearch size="2rem" color={color} />
        </button>
      </div>
    </div>
  );
};

const Filters = (props = {}) => {
  const {
    genres,
    onClickGenre,
    tags,
    onAddTag,
    onCancelTag,
    finished,
    onChangeFinished,
  } = props;

  return (
    <div>
      <Accordion text="Filtros">
        <div className="stories-filters">
          <div className="stories-filters__section">
            <h5 className="stories-filters__title">Géneros</h5>
            <div className="stories-filters__filter">
              <GenresCheckList
                value={genres}
                onChange={onClickGenre}
              ></GenresCheckList>
            </div>
          </div>
          <div className="stories-filters__section">
            <h5 className="stories-filters__title">Etiquetas</h5>
            <div className="stories-filters__filter">
              <TagsInput tags={tags} onAdd={onAddTag} onCancel={onCancelTag} />
            </div>
          </div>
          <div className="stories-filters__section">
            <h5 className="stories-filters__title">Estado</h5>
            <div className="stories-filters__filter">
              <label
                htmlFor="radio-finished"
                className="stories-filters__radio"
              >
                <Check
                  onChange={onChangeFinished}
                  checked={finished === true}
                  value="true"
                  type="radio"
                  name="state"
                  id="radio-finished"
                />{" "}
                Finalizado
              </label>
              <label htmlFor="radio-ongoing" className="stories-filters__radio">
                <Check
                  onChange={onChangeFinished}
                  checked={finished === false}
                  value="false"
                  type="radio"
                  name="state"
                  id="radio-ongoing"
                />{" "}
                Publicando
              </label>
              <label htmlFor="radio-all" className="stories-filters__radio">
                <Check
                  onChange={onChangeFinished}
                  checked={finished === null}
                  value="null"
                  type="radio"
                  name="state"
                  id="radio-all"
                />{" "}
                Cualquiera
              </label>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

const Stories = (props = {}) => {
  const [filters, setFilters] = useState({
    query: "",
    genres: [],
    tags: [],
    finished: null,
  });
  const [search, setSearch] = useState("");
  const { query, ...otherFilters } = filters;

  const { loading, result, error } = useGet("stories", filters);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickGenre = (id) => {
    const genres = filters.genres;
    const copy = [...genres];
    const index = copy.indexOf(id);
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(id);
    }
    setFilters({
      ...filters,
      genres: copy,
    });
  };

  const handleAddTag = (name) => {
    setFilters({
      ...filters,
      tags: [...filters.tags, name],
    });
  };

  const handleCancelTag = (name) => {
    const copy = [...filters.tags];
    const index = copy.indexOf(name);
    if (index > -1) {
      copy.splice(index, 1);
      setFilters({
        ...filters,
        tags: copy,
      });
    }
  };

  const handleChangeFinished = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      finished: JSON.parse(value),
    });
  };

  const filtersProps = {
    ...otherFilters,
    onAddTag: handleAddTag,
    onCancelTag: handleCancelTag,
    onClickGenre: handleClickGenre,
    onChangeFinished: handleChangeFinished,
  };

  return (
    <div className="stories">
      <Search value={search} onChange={handleChangeSearch} />
      <Filters {...filtersProps} />
      {loading && (
        <div className="stories__load-message">
          <Spinner size="x-small" /> Buscando las historias
        </div>
      )}
      {!loading && error && (
        <span className="stories__error-message">
          Error al obtener las historias: {error.message}
        </span>
      )}
      {result && <Library stories={result.results} total={result.count} />}
    </div>
  );
};

export default Stories;
