import "../styles/sidebar.css";

const Sidebar = (props = {}) => {
  return <div className="sidebar">{props.children}</div>
}

export default Sidebar;
