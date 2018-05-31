import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './containers/App'
import MainWindow from './containers/MainWindow'

export default () => (
  <App>
    <Switch>
      <Route path='/' component={MainWindow} />
    </Switch>
  </App>
)
