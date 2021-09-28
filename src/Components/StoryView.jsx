import useGet from "../Hooks/useGet.jsx";
import { Tag, Genre } from "./Globals.jsx";
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
        <div className="story-view__rating">{result?.rating && <div />}</div>
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

export default StoryView;
