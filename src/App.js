import React, { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import LoginModal from "./Components/LoginModal.jsx";
import Api from "./Utils/Api.js";
import UserContext from "./Context/UserContext.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const promise = Api.sessions.get();
    promise.then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser({ id: 0 });
      }
    }).catch((e) => setUser({ id: 0 }));
  }, []);

  const actions = {
    showForms: () => setModalOpen(true),
    hiddeForms: () => setModalOpen(false),
  }

  const onLogin = (form) => {
    const username = form["username"];
    const password = form["password"];

    Api.sessions.body({ username, password }).post()
    .then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser({ id: 0 });
      }
    });
  }

  const onSignup = (form) => {
    const email = form["email"];
    const username = form["username"];
    const password = form["password"];

    Api.sessions.body({ email, username, password }).post()
    .then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser({ id: 0 });
      }
    });
  }

  return user === null ? (
    <div />
  ) : (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header actions={actions} />
        {(user.id === 0 && modalOpen) &&  
        <LoginModal 
          open={modalOpen} 
          setOpen={setModalOpen}
          onLogin={onLogin}
          onSignup={onSignup}
        />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
