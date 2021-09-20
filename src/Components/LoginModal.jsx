import React, { Suspense } from 'react';

const Forms = React.lazy(() => import("./UserForms.jsx"));

const LoginModal = (props = {}) => {
  const open = props.open;
  const setOpen = props.setOpen;

  const close = () => setOpen(false);

  return <div className={"login-modal" + (open ? "" : " hidden")} >
    <div className="login-modal__background" onClick={close}></div>
    <div className="login-modal__body">
      <Suspense fallback={<div>Loading...</div>}>
        <Forms close={close}></Forms>
      </Suspense>
    </div>
  </div>
}

export default LoginModal;
