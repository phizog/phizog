import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Terms from './components/Terms'
import LoginWindow from './container/LoginWindow'
import AuthContainer from './container/AuthContainer'
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
            render={(props: any) => <LoginWindow {...this.props} {...props} />}
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
    <AuthContainer>
      <Router />
    </AuthContainer>
  </App>
)
