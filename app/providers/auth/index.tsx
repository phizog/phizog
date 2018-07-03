import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { IProfiler } from '../../modules/profiler/interfaces'
export interface IProps extends RouteComponentProps<any> {
  profile: IProfiler
  children?: any
  inProgress: boolean
  toggle (): void
}
/**
 * Authorizer will wrap children component and check the user's
 * token is valid or not
 *
 * @export
 * @class Authorizer
 * @extends {React.Component<IProps>}
 */
export class Authorizer extends React.Component<IProps> {
  constructor (props: any) {
    super(props)
  }
  componentWillMount () {
    if (
      this.props.profile.data.skipLogin ||
      (this.props.children.props.location.state &&
        this.props.children.props.location.state.skipLogin)
    ) {
      this.props.profile.data.skipLogin = true
      this.props.profile.save()
      if (this.props.children.props.location.pathname !== '/') {
        this.props.children.props.history.push('/')
      }
    } else {
      if (this.props.profile.isValid(this.props.profile.data)) {
        this.props.profile
          .pingtoken()
          .then(() => this.props.children.props.history.push('/'))
          .catch(() => {
            if (this.props.children.props.location.pathname !== '/login') {
              this.props.children.props.history.push('/login')
            }
            this.props.toggle()
          })
      } else {
        // redirect currrent page to login route if user's profile isn't valid
        if (this.props.children.props.location.pathname !== '/login') {
          this.props.children.props.history.push('/login')
        }
        this.props.toggle()
      }
    }
  }
  render () {
    return <div>{this.props.children}</div>
  }
}