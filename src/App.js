import React, { useEffect, useState, Suspense } from "react";
import Header from "./Components/Header.jsx";
import LoginModal from "./Components/LoginModal.jsx";
import Check from "./Components/Check.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Api from "./Utils/Api.js";
import UserContext from "./Context/UserContext.jsx";
import "./App.css";
import useGet from "./Hooks/useGet.jsx";

const Home = React.lazy(() => import("./Pages/Home.jsx"));
const Story = React.lazy(() => import("./Pages/Story.jsx"));

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, result, error } = useGet("sessions");
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
        const u = await res.json();
        setUser(u);
        window.localStorage.setItem("tkn", u.token);
      } else {
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
        const u = await res.json();
        setUser(u);
        window.localStorage.setItem("tkn", u.token);
      } else {
        setUser({ id: 0 });
      }
    });
  };

  const header = <Header actions={actions} />;

  return loading ? (
    <div />
  ) : (
    <div className="App">
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Route path="/:story">
              <Suspense fallback={<div />}>
                {header}
                <Story />
              </Suspense>
            </Route>
            <Route path="/">
              <Suspense fallback={<div />}>
                {header}
                <Home />
              </Suspense>
            </Route>
          </Switch>
        </Router>
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
