import { useParams } from "react-router-dom";
import StoryView from "../Components/StoryView.jsx";
import Sidebar from "../Components/Sidebar.jsx";

const Story = (props = {}) => {
  const { story } = useParams();
  return (
    <div className="body">
      <StoryView slug={story} />
      <Sidebar></Sidebar>
    </div>
  );
};

export default Story;
