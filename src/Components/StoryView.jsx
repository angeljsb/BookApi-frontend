import useGet from "../Hooks/useGet.jsx";
import { Tag, Genre, Rating } from "./Globals.jsx";
import "../styles/story-view.css";

const StoryView = (props = {}) => {
  const slug = props.slug;

  const { loading, result, error } = useGet("stories", { slug });

  return error ? (
    <div />
  ) : (
    <div className={`story-view ${loading ? "story-view--loading" : ""}`}>
      <div className="story-view__cover">
        {result && (
          <img
            className="story-view__image"
            src={result.cover || "curso.png"}
            alt={result.name}
          ></img>
        )}
      </div>
      <div className="story-view__info">
        <div className="story-view__name">
          {result && <h3>{result.title}</h3>}
        </div>
        <div className="story-view__rating">
          {result?.rating && <Rating rating={result.rating} />}
        </div>
        <div className="story-view__sinopsis">
          {result && <p>{result.sinopsis}</p>}
        </div>
        <div className="story-view__genres">
          {result?.genres &&
            result.genres.map((val, index) => (
              <Genre key={index} genre={val} />
            ))}
        </div>
        <div className="story-view__tags">
          {result &&
            result.tags.map((val, index) => <Tag key={index}>{val.name}</Tag>)}
        </div>
      </div>
    </div>
  );
};

const Chapters = (props = {}) => {
  const { slug, ...otherProps } = props;

  const { loading, result, error } = useGet("chapters", { story: slug });
  console.log(result);
  return (
    <div className="chapters">
      <h4 className="chapters__h">Capítulos</h4>
      <ul className="chapters__list">
        {loading ||
          error ||
          result.map((value, index) => (
            <li key={index}>
              <div className="chapters__item">
                <div className="chapters__number">{value.number}</div>
                <div className="chapters__title">{value.title}</div>
                {!value.published && (
                  <div className="chapters__published">No publicada</div>
                )}
                <div className="chapters__read">
                  <button>Leer</button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Chapters };

export default StoryView;
