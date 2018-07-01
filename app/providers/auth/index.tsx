import * as React from 'react'
import { IProfiler } from '../../modules/profiler/interfaces'
import { RouteComponentProps } from 'react-router'

export interface IProps extends RouteComponentProps<any> {
  profile: IProfiler
  history: any
  location: any
  inProgress: boolean
  toggle (): void
}

export const authorizer = () => (WrappedComponent: any) => {
  return class extends React.Component<IProps> {
    constructor (props: any) {
      super(props)
    }
    componentWillMount () {
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
