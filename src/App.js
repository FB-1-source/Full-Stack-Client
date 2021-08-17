import "../src/styles.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Newpost from "./Components/Newpost";
import Postinfo from "./Components/Postinfo";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PageNotFound from "./Components/PageNotFound";
import Welcome from "./Components/Welcome";
import { Authcontext } from "./Authcheck/Authcontext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [Authstate, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://full-stack-api-sportytalk.herokuapp.com/auth/authcheck", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...Authstate, status: false });
        } else
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = "/";
  };

  return (
    <Authcontext.Provider value={{ Authstate, setAuthState }}>
      <div className="App">
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/newpost">Create New Post</Link>
            {!Authstate.status ? (
              <>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <div className="new">
                <Link to="/home">Posts</Link>
                <button onClick={logout}>Logout</button>
              </div>
            )}
            <div className="logo">
              <h1>
                SportyTalk <i class="far fa-comments"></i>
              </h1>
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/home" exact component={Home} />
            <Route path="/newpost" exact component={Newpost} />
            <Route path="/post/:id" exact component={Postinfo} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </Authcontext.Provider>
  );
}

export default App;
