import StoryCard, { LoadingCard } from "./StoryCard.jsx";
import "../styles/library.css";

const LoadingLibrary = (props = {}) => {
	return (
		<div className="library">
			<LoadingCard />
			<LoadingCard />
			<LoadingCard />
			<LoadingCard />
		</div>
	);
};

const Library = (props = {}) => {
	const stories = props.stories;
	const total = props.total || 0;

	const cards = stories.map((story, index) => (
		<StoryCard key={index} story={story} />
	));

	return <div className="library">{cards}</div>;
};

export { LoadingLibrary };

export default Library;
