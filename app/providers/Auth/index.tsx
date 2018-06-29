import * as React from 'react'
import { Profiler } from '../../modules/profiler'
import { IProfiler } from '../../modules/profiler/interfaces'
import { CorupptedComponnet } from '../../components/Util'

interface IAuthProps {
  children?: any
}

interface IAuthState {
  profile: IProfiler
  history?: any
  location?: any
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  componentWillMount () {
    this.setState({ profile: new Profiler() })
  }

  render () {
    const {
      state,
      props: { children }
    } = this
    if (!children || typeof children !== 'object') return <CorupptedComponnet />
    return React.cloneElement(children, state)
  }
}

export const authorizer = () => (WrappedComponent: any) => {
  return class extends React.Component<IAuthState> {
    constructor (props: IAuthState) {
      super(props)

      if (this.props.profile.isValid(this.props.profile.data)) {
        this.props.profile
          .pingtoken()
          .then(() => this.props.history.push('/'))
          .catch(() => {
            if (this.props.location.pathname !== '/login') this.props.history.push('/login')
          })
      } else {
        // redirect currrent page to login route if user's profile isn't valid
        if (this.props.location.pathname !== '/login') {
          this.props.history.push('/login')
        }
      }
    }
    render () {
      return <WrappedComponent />
    }
  }
}
