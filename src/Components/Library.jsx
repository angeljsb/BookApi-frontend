import StoryCard from "./StoryCard.jsx";
import "../styles/library.css";

const Library = (props = {}) => {
  const stories = props.stories;

  const cards = [<StoryCard key="1"/>, <StoryCard key="2"/>];//stories.map((story, index) => <StoryCard key={index} story={story} />);

  return <div className="library">
    {cards}
  </div>;
}

export default Library;
