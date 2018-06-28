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

      console.log(this.props.location)
      if (
        this.props.profile.isValid(this.props.profile.data) &&
        this.props.location.pathname !== '/login'
      ) {
        this.props.profile
          .pingtoken()
          .then(() => {
            this.props.history.push('/')
          })
          .catch(() => {
            this.props.history.push('/login')
          })
      }
    }
    render () {
      return <WrappedComponent />
    }
  }
}
