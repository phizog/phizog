import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'
import { RouteComponentProps } from 'react-router'
import { IProfiler } from '../modules/profiler/interfaces'
import { logger } from '../modules/util'
import { LOGLEVEL } from '../interfaces/util'

export interface IProps extends RouteComponentProps<any> {
  profile: IProfiler
  children?: any
  inProgress: boolean
  toggle(): void
}

/**
 * Authorizer will wrap children component and check the user's
 * token is valid or not
 *
 * @class Authorizer
 * @extends {React.Component<IProps>}
 */
class Authorizer extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props)
  }
  componentDidUpdate() {
    // set skipLogin property
    let skipLogin: boolean = this.props.profile.data.skipLogin

    if (skipLogin) {
      setSkipLogin(this.props.profile, skipLogin)
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
            if (this.props.inProgress) this.props.toggle()
          })
      } else {
        // redirect currrent page to login route if user's profile isn't valid
        if (this.props.children.props.location.pathname !== '/login') {
          this.props.children.props.history.push('/login')
        }
      }
    }
  }
  render() {
    return this.props.children
  }
}

export const setSkipLogin = (profile: IProfiler, nextState: boolean) => {
  if (profile.data.skipLogin !== nextState) {
    profile.data.skipLogin = nextState
    logger(LOGLEVEL.INFO, 'login skipped', profile.data.skipLogin)
    profile.save()
  }
}

function mapStateToProps(state: IState): Partial<any> {
  return {
    inProgress: state.inProgress
  }
}

function mapDispatchToProps(dispatch: any): Partial<any> {
  return bindActionCreators(InprogressActions, dispatch)
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorizer) as any) as React.StatelessComponent<any>
