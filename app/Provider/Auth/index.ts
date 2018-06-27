import * as React from 'react'
import { Profiler } from '../../modules/profiler'
import { IProfiler } from '../../modules/profiler/interfaces'

interface IAuthProps {
  children?: any
}

interface IAuthState {
  profile: IProfiler
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  componentWillMount () {
    this.setState({ profile: new Profiler() })
  }

  render () {
    const {
      state: { profile },
      props: { children }
    } = this
    if (!children || typeof children !== 'function') return null

    return children(profile)
  }
}
