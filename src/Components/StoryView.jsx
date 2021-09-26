import useGet from "../Hooks/useGet.jsx";

const StoryView = (props = {}) => {
  const slug = props.slug;

  const { loading, result, error } = useGet("story", { slug });

  return (
    <div className={`story-view ${loading ? "story-view--loading" : ""}`}>
      <div className="story-view__cover"></div>
      <div className="story-view__info">
        <div className="story-view__name">
          {result && <h3>{result.name}</h3>}
        </div>
        <div className="story-view__rating">{result?.rating && <div />}</div>
        <div className="story-view__sinopsis"></div>
        <div className="story-view__genres"></div>
        <div className="story-view__tags"></div>
      </div>
    </div>
  );
};

export default StoryView;
