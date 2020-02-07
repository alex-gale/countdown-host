import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.scss'
import Start from './containers/start'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Start} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
