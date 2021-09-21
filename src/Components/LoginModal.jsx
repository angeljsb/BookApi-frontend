import React, { Suspense } from 'react';
import '../styles/login-modal.css';

const Forms = React.lazy(() => import("./UserForms.jsx"));

const LoginModal = (props = {}) => {
  const open = props.open;
  const setOpen = props.setOpen;
  const onLogin = props.onLogin;
  const onSignup = props.onSignup;

  const close = () => setOpen(false);

  return <div className={"login-modal" + (open ? "" : " hidden")} >
    <div className="login-modal__background" onClick={close}></div>
    <div className="login-modal__body">
      <Suspense fallback={<div>Loading...</div>}>
        <Forms onLogin={onLogin} onSignup={onSignup} close={close} />
      </Suspense>
    </div>
  </div>
}

export default LoginModal;
