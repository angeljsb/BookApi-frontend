import { useContext } from "react";
import UserContext from "../Context/UserContext.jsx";
import { CgLogIn } from "react-icons/cg";
import { Logo } from "./Globals.jsx";
import "../styles/header.css";

const Header = (props = {}) => {
  const { actions, ...otherProps } = props;

  const user = useContext(UserContext);

  const logged = user && user.id > 0;

  return (
    <header className="header" {...otherProps}>
      <div className="header__start">
        <Logo />
      </div>
      <div className="header__end">
        {logged ? (
          <button>Perfil</button>
        ) : (
          <button onClick={actions.showForms}>
            <CgLogIn size="2rem" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
