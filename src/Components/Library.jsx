import StoryCard from "./StoryCard.jsx";
import "../styles/library.css";

const Library = (props = {}) => {
  const stories = props.stories;
  //const total = props.total;

  const cards = stories.map((story, index) => <StoryCard key={index} story={story} />);

  return <div className="library">
    {cards}
  </div>;
}

export default Library;
