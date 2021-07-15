import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login"
import Competitions from "../pages/competitions"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/competitions" component={Competitions} />
            <Route exact path="/chats" component={Chats} />
            <Route exactpath="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
