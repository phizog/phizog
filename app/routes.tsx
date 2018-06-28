import * as React from 'react'
import { Switch, Route } from 'react-router'
import { Auth } from './providers/Auth'
import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
/**
 * Wraping Switch tag to passing some props to routes
 *
 * @class Router
 * @extends {React.Component<any>}
 */
class Router extends React.Component<any> {
  render () {
    return (
      <Switch>
        <Route
          path='/login'
          render={(props: any) => <Login {...this.props} {...props} />}
        />
        <Route
          path='/'
          render={(props: any) => <Home {...this.props} {...props} />}
        />
      </Switch>
    )
  }
}

export default () => (
  <App>
    <Auth>
      <Router />
    </Auth>
  </App>
)
