import * as React from 'react'
import { Profiler } from '../../modules/profiler'
import { IProfiler } from '../../modules/profiler/interfaces'
import { CorupptedComponnet } from '../../components/Util'

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
      state,
      props: { children }
    } = this
    if (!children || typeof children !== 'object') return <CorupptedComponnet />
    return React.cloneElement(children, state)
  }
}
