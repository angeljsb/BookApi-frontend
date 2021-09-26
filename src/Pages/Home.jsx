import Stories from "../Components/Stories.jsx";
import Sidebar from "../Components/Sidebar.jsx";

const Home = (props = {}) => {
  return (
    <div className="body">
      <Stories />
      <Sidebar></Sidebar>
    </div>
  );
};

export default Home;
