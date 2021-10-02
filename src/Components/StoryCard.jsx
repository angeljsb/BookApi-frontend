import { Rating } from "./Globals.jsx";
import { Link } from "react-router-dom";
import "../styles/story-card.css";

/*const story = {
  title: "Mi linda historia",
  sinopsis: "Esta es una historia de prueba",
  cover: "https://firebasestorage.googleapis.com/v0/b/mismangas-7e620.appspot.com/o/uploads%2F3oesb3tldzt?alt=media&token=e006a18c-b59d-4a74-b2c7-d3849a0d49ba",
  rating: 3.5,
  published: true,
  finished: false
};*/

const LoadingCard = (props = {}) => {
  return (
    <div className="story-card loading">
      <div className="story-card__body">
        <div className="story-card__cover"></div>
        <div className="story-card__info">
          <h4 className="story-card__title"></h4>
          <div className="story-card__rating"></div>
          <p className="story-card__sinopsis"></p>
        </div>
      </div>
    </div>
  );
};

const StoryCard = (props = {}) => {
  const story = props.story;

  return (
    <div className="story-card">
      <Link to={`/${story.slug}`}>
        <div className="story-card__body">
          <div className="story-card__cover">
            <img
              className="story-card__image"
              draggable={false}
              src={story.cover || "curso.png"}
              alt={`${story.title}-cover`}
            />
          </div>
          <div className="story-card__info">
            <h4 className="story-card__title">{story.title}</h4>
            {story.rating && (
              <div className="story-card__rating">
                <Rating rating={story.rating}></Rating>
              </div>
            )}
            <p className="story-card__sinopsis">{story.sinopsis}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { LoadingCard };

export default StoryCard;
