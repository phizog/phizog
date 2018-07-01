import * as React from 'react'
import { Profiler } from '../../modules/profiler'
import { IProfiler } from '../../modules/profiler/interfaces'
import { CorupptedComponnet } from '../../components/Util'
import { RouteComponentProps } from 'react-router'

interface IAuthState {
  profile: IProfiler
  history?: any
  location?: any
  inProgress: boolean
  toggle (): void
}

export interface IProps extends RouteComponentProps<any> {
  children?: any
}

export class Auth extends React.Component<IProps, IAuthState> {
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
  return class extends React.Component<IAuthState, IProps> {
    constructor (props: any) {
      super(props)

      if (
        this.props.profile.data.skipLogin ||
        (this.props.location.state && this.props.location.state.skipLogin)
      ) {
        this.props.profile.data.skipLogin = true
        this.props.profile.save()
        if (this.props.location.pathname !== '/') this.props.history.push('/')
      } else {
        if (this.props.profile.isValid(this.props.profile.data)) {
          this.props.profile
            .pingtoken()
            .then(() => this.props.history.push('/'))
            .catch(() => {
              if (this.props.location.pathname !== '/login') {
                this.props.history.push('/login')
              }
              this.props.toggle()
            })
        } else {
          // redirect currrent page to login route if user's profile isn't valid
          if (this.props.location.pathname !== '/login') {
            this.props.history.push('/login')
          }
          this.props.toggle()
        }
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}
