import Library, { LoadingLibrary } from "../Components/Library.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import useGet from "../Hooks/useGet.jsx";

const MyStories = (props = {}) => {
	const { loading, result, error } = useGet("stories", { my: true });

	return loading ? (
		<LoadingLibrary />
	) : error ? (
		<div>Hubo un error</div>
	) : (
		<Library stories={result.results} total={result.count} />
	);
};

const Write = (props = {}) => {
	return (
		<div className="body write">
			<div>
				<h2 className="write__welcome">¡Libera tu creatividad al maximo!</h2>
				<MyStories />
			</div>
			<Sidebar />
		</div>
	);
};

export default Write;
