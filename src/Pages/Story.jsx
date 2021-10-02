import { useParams } from "react-router-dom";
import StoryView, { Chapters } from "../Components/StoryView.jsx";
import Sidebar from "../Components/Sidebar.jsx";

const Story = (props = {}) => {
	const { story } = useParams();
	return (
		<div className="body">
			<div>
				<StoryView slug={story} />
				<Chapters slug={story} />
			</div>

			<Sidebar></Sidebar>
		</div>
	);
};

export default Story;
