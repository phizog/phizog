import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './containers/App'
import MainWindow from './containers/MainWindow'
import LoginWindow from './containers/LoginWindow'

export default () => (
  <App>
    <Switch>
      <Route path='/login' component={LoginWindow} />
      <Route path='/' component={MainWindow} />
    </Switch>
  </App>
)
