import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Terms from './components/Terms'
import LoginWindow from './container/LoginWindow'
import { ProfileContext } from './providers/profile'
import { Profiler } from './modules/profiler'
import AuthContainer from './container/AuthContainer'
/**
 * Wraping Switch tag to passing some props to routes
 *
 * @class Router
 * @extends {React.Component<any>}
 */

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: {
  component: any
  path: string
}) => (
  <Route
    {...rest}
    render={(props: any) => (
      <ProfileContext.Consumer>
        {profile => {
          return (
            <AuthContainer profile={profile}>
              <Component {...props} />
            </AuthContainer>
          )
        }}
      </ProfileContext.Consumer>
    )}
  />
)

export default () => (
  <App>
    <ProfileContext.Provider value={new Profiler()}>
      <div className='window'>
        <Switch>
          <PrivateRoute path='/login' component={LoginWindow} />
          <Route path='/terms' render={(props: any) => <Terms {...props} />} />
          <PrivateRoute path='/' component={Home} />
        </Switch>
      </div>
    </ProfileContext.Provider>
  </App>
)
