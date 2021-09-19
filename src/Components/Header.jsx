import { useContext } from 'react';
import UserContext from '../Context/UserContext.jsx';
import Logo from './Logo.jsx';

const Header = (props = {}) => {
    const user = useContext(UserContext);

    const logged = user && user.id > 0;

    return <header className="header" { ...props }>
        <div className="header__start">
            <Logo/>
        </div>
        <div className="header__end">
            {logged 
            ? <button>Perfil</button>
            : <button>Iniciar Sesión</button>
            }
        </div>
    </header>;
}

export default Header;