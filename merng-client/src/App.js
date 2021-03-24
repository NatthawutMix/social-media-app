import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utill/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from './pages/SinglePost'
import Menubar from "./components/Menubar";


import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <Container>
            <Menubar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
