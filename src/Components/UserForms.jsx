import React, { useState } from 'react';

const Login = (props = {}) => {
  const toggleForm = props.toggleForm || {};
  const close = props.close || false;
  const onSubmit = props.onSubmit;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return <div className="user-forms__login">
    <form action="" className="user-forms__form">
      <div className="user-forms__header">
        <h2 className="user-forms__title">Iniciar Sesión</h2>
      </div>
      <div className="user-forms__content"></div>
      <div className="user-forms__footer">
        <div className="user-forms__options">
          {close && <button onClick={close}>Cerrar</button>}
          <button type="submit">Enviar</button>
        </div>
      </div>
    </form>
  </div>;
}

const Signup = (props = {}) => {
  const toggleForm = props.toggleForm || {};
  const close = props.close || false;
  const onSubmit = props.onSubmit;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return <div className="user-forms__signup">
    <form action="" className="user-forms__form">
      <div className="user-forms__header">
        <h2 className="user-forms__title">Registrarse</h2>
      </div>
      <div className="user-forms__content"></div>
      <div className="user-forms__footer">
        <div className="user-forms__options">
          {close && <button onClick={close}>Cerrar</button>}
          <button type="submit">Enviar</button>
        </div>
      </div>
    </form>
  </div>;
}

const UserForms = (props = {}) => {
  const { /*onLogin, onSignup,*/ close } = props;

  const [isLogin, setLogin] = useState(false);

  const toggleForm = () => setLogin(!isLogin);

  return <div className="user-forms">
    {isLogin
      ? <Login toggleForm={toggleForm} close={close}></Login>
      : <Signup toggleForm={toggleForm} close={close} />}
  </div>
}

export default UserForms;
