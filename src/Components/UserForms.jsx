import React, { useState } from 'react';
import TextInput from './TextInput';
import '../styles/user-forms.css';

const passwordMessage = (pass) => {
  if (!pass)
    return "";
  if (pass.length < 8)
    return "La contraseña debe tener un minimo de 8 carácteres";
  if (!/\w/.test(pass))
    return "La contraseña debe tener al menos un caracter alfanumerico";
  if (!/\d/.test(pass))
    return "La contraseña debe tener al menos un caracter númerico";
  if (!/\W/.test(pass))
    return "La contraseña debe tener al menos un signo de puntuación";
  return "";
}

const emailMessage = (email) => {
  if (!email)
    return "";
  if (!email.includes("@"))
    return "No se encuentra el caracter @";
  if (!/@.+/.test(email))
    return "Debe haber algo luego del caracter @";
  if (!/.+@/.test(email))
    return "Debe haber algo antes del caracter @";
  return "";
}

const usernameMessage = (username) => {
  if (!username)
    return "";
  if (/^\d+$/.test(username))
    return "No pueden ser solo caracteres númericos";
  return "";
}

const Login = (props = {}) => {
  const toggleForm = props.toggleForm || {};
  const close = props.close || false;
  const onSubmit = props.onSubmit;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const usernameError = "";
  const passwordError = passwordMessage(password);
  const passwordConfirmError = password === passwordConfirm
    ? "" : "Las contraseñas no coinciden";

  const disabled = !password || !username || usernameError || passwordError || passwordConfirmError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onSubmit(e.target);
  }

  const handleChange = (setState) => {
    return (e) => setState(e.target.value);
  }

  const handleToggle = (e) => {
    e.preventDefault();
    toggleForm();
  }

  return <div className="user-forms__login">
    <form onSubmit={handleSubmit} action="" className="user-forms__form">
      <div className="user-forms__header">
        <h2 className="user-forms__title">Iniciar Sesión</h2>
      </div>
      <div className="user-forms__content">
        <TextInput required type="text" onChange={handleChange(setUsername)} value={username} error={usernameError} id="login-username" name="username" label="Username o Email" />
        <TextInput required type="password" onChange={handleChange(setPassword)} value={password} error={passwordError} id="login-password" name="password" label="Contraseña" />
        <TextInput required type="password" onChange={handleChange(setPasswordConfirm)} value={passwordConfirm} error={passwordConfirmError} id="login-password-confirm" name="password-confirm" label="Repetir Contraseña" />
        <button onClick={handleToggle} href="#" className="user-forms__switch">No tengo una cuenta</button>
      </div>
      <div className="user-forms__footer">
        <div className="user-forms__options">
          {close && <button type="button" className="user-forms__button user-forms__button--secondary" onClick={close}>Cerrar</button>}
          <button type="submit" className="user-forms__button user-forms__button--primary" disabled={disabled} >Enviar</button>
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

  const usernameError = usernameMessage(username);
  const emailError = emailMessage(email);
  const passwordError = passwordMessage(password);
  const passwordConfirmError = password === passwordConfirm
    ? "" : "Las contraseñas no coinciden";

  const disabled = !password || !username || !email || usernameError || passwordError || passwordConfirmError || emailError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onSubmit(e.target);
  }

  const handleChange = (setState) => {
    return (e) => setState(e.target.value);
  }

  const handleToggle = (e) => {
    e.preventDefault();
    toggleForm();
  }
  return <div className="user-forms__signup">
    <form onSubmit={handleSubmit} action="" className="user-forms__form">
      <div className="user-forms__header">
        <h2 className="user-forms__title">Registrarse</h2>
      </div>
      <div className="user-forms__content">
        <TextInput required type="text" onChange={handleChange(setUsername)} value={username} error={usernameError} id="signup-username" name="username" label="Username" />
        <TextInput required type="email" onChange={handleChange(setEmail)} value={email} error={emailError} id="signup-email" name="email" label="Email" />
        <TextInput required type="password" onChange={handleChange(setPassword)} value={password} error={passwordError} id="signup-password" name="password" label="Contraseña" />
        <TextInput required type="password" onChange={handleChange(setPasswordConfirm)} value={passwordConfirm} error={passwordConfirmError} id="signup-password-confirm" name="password-confirm" label="Repetir Contraseña" />
        <button onClick={handleToggle} href="#" className="user-forms__switch">¿Ya tienes una cuenta?</button>
      </div>
      <div className="user-forms__footer">
        <div className="user-forms__options">
          {close && <button type="button" className="user-forms__button user-forms__button--secondary" onClick={close}>Cerrar</button>}
          <button type="submit" className="user-forms__button user-forms__button--primary" disabled={disabled}>Enviar</button>
        </div>
      </div>
    </form>
  </div>;
}

const UserForms = (props = {}) => {
  const { onLogin, onSignup, close } = props;

  const [isLogin, setLogin] = useState(true);

  const toggleForm = () => setLogin(!isLogin);

  return <div className="user-forms">
    {isLogin
      ? <Login onSubmit={onLogin} toggleForm={toggleForm} close={close}></Login>
      : <Signup onSubmit={onSignup} toggleForm={toggleForm} close={close} />}
  </div>
}

export default UserForms;
