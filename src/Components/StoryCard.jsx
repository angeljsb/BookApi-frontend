import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
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

const StoryCard = (props = {}) => {
  const story = props.story;

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
              <div className="story-card__rating">{stars(story.rating)}</div>
            )}
            <p className="story-card__sinopsis">{story.sinopsis}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;
