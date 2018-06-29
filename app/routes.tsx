import * as React from 'react'
import { Switch, Route } from 'react-router'
import { Auth } from './providers/Auth'
import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
import Terms from './components/Terms'
/**
 * Wraping Switch tag to passing some props to routes
 *
 * @class Router
 * @extends {React.Component<any>}
 */
class Router extends React.Component<any> {
  render () {
    return (
      <div className='window'>
        <Switch>
          <Route
            path='/login'
            render={(props: any) => <Login {...this.props} {...props} />}
          />
          <Route
            path='/terms'
            render={(props: any) => <Terms {...this.props} {...props} />}
          />
          <Route
            path='/'
            render={(props: any) => <Home {...this.props} {...props} />}
          />
        </Switch>
      </div>
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
