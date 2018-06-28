import * as React from 'react'
// import { Auth } from '../Provider/Auth'

export default class App extends React.Component {
  render () {
    return <div>{this.props.children}</div>
  }
}
