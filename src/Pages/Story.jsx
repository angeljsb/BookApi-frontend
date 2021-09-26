import { useParams } from "react-router-dom";

const Story = (props = {}) => {
	const { story } = useParams();
	return <div>{story}</div>;
};

export default Story;
