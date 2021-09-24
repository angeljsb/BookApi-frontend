import React, { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import LoginModal from "./Components/LoginModal.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Api from "./Utils/Api.js";
import UserContext from "./Context/UserContext.jsx";
import "./App.css";
import Stories from "./Components/Stories.jsx";
import useGet from "./Hooks/useGet.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, result, error] = useGet("sessions");
  useEffect(() => {
    if (error) {
      setUser({ id: 0 });
    } else {
      setUser(result);
    }
  }, [error, result]);

  const actions = {
    showForms: () => setModalOpen(true),
    hiddeForms: () => setModalOpen(false),
  };

  const onLogin = (form) => {
    const username = form["username"].value;
    const password = form["password"].value;

    Api.sessions.post({ username, password }).then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        console.log(await res.text());
        setUser({ id: 0 });
      }
    });
  };

  const onSignup = (form) => {
    const email = form["email"].value;
    const username = form["username"].value;
    const password = form["password"].value;

    Api.users.post({ email, username, password }).then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser({ id: 0 });
      }
    });
  };

  return loading ? (
    <div />
  ) : (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header actions={actions} />
        <div className="body">
          <Stories />
          <Sidebar />
        </div>
        {user?.id === 0 && modalOpen && (
          <LoginModal
            open={modalOpen}
            setOpen={setModalOpen}
            onLogin={onLogin}
            onSignup={onSignup}
          />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
