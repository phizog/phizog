import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './components/App'
import Terms from './components/Terms'
import LoginWindow from './container/LoginWindow'
import { ProfileContext } from './providers/profile'
import { Profiler } from './modules/profiler'
import AuthContainer from './container/AuthContainer'
import HomeWindow from './container/HomeWindow'

/**
 * Cunsuming ProfileContext and passing it as prop to the route
 *
 * @param component
 * @param path
 * @returns (React.Component)
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
            <AuthContainer profile={profile} {...props}>
              <Component profile={profile} {...props} />
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
          <PrivateRoute path='/' component={HomeWindow} />
        </Switch>
      </div>
    </ProfileContext.Provider>
  </App>
)
