import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Login from '../components/Login'

export class LoginWindow extends React.Component<
  RouteComponentProps<any>,
  void
> {
  render () {
    return <Login />
  }
}

export default (LoginWindow as any) as React.StatelessComponent<
  RouteComponentProps<any>
>
