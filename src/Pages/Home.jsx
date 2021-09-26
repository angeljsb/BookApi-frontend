import Header from "../Components/Header.jsx";
import Stories from "../Components/Stories.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import LoginModal from "../Components/LoginModal.jsx";

const Home = (props = {}) => {
	return (
		<div className="body">
			<Stories />
			<Sidebar></Sidebar>
		</div>
	);
};

export default Home;
