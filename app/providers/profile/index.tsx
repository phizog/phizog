import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Profiler } from '../../modules/profiler'
import { CorupptedComponnet } from '../../components/Util'

export interface IProps extends RouteComponentProps<any> {
  children?: any
}

export class Profile extends React.Component<IProps> {
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
