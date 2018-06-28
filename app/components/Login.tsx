import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../modules/constants'
// import { Github } from '../modules/github'

export default class Login extends React.Component<any> {
  constructor (props: any) {
    super(props)
  }
  render () {
    let win = remote.getCurrentWindow()
    win.setSize(constants.windows.login.width, constants.windows.login.height)
    win.center()

    return <div>loasdfgin</div>
  }
}
