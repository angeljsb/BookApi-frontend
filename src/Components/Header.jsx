import { useContext } from 'react';
import UserContext from '../Context/UserContext.jsx';
import Logo from './Logo.jsx';
import '../styles/header.css';

const Header = (props = {}) => {
    const actions = props.actions || {};

    const user = useContext(UserContext);

    const logged = user && user.id > 0;

    return <header className="header" {...props}>
        <div className="header__start">
            <Logo />
        </div>
        <div className="header__end">
            {logged
                ? <button>Perfil</button>
                : <button onClick={actions.showForms}>Iniciar Sesión</button>
            }
        </div>
    </header>;
}

export default Header;