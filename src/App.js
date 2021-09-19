import React, { useEffect } from 'react';
import Api from './Utils/Api.js';
import UserContext from './Context/UserContext.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect( async () => {
    const res = await Api.sessions.get();
    if(res.ok) {
      setUser(await res.json());
    } else {
      setUser({ id: 0 });
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
      </UserContext.Provider>
    </div>
  );
}

export default App;
