import * as React from 'react'
import { ipcRenderer, remote } from 'electron'
import { IProfiler } from '../modules/profiler/interfaces'
import { constants } from '../modules/constants'
interface ILoginStates {
  profile: IProfiler
}

export default class Login extends React.Component<any, ILoginStates> {
  constructor (props: any) {
    super(props)
    this.state = {
      profile: ipcRenderer.sendSync('getProfile')
    }
  }
  render () {
    let win = remote.getCurrentWindow()
    win.setSize(constants.windows.login.width, constants.windows.login.height)
    win.center()
    return (
      <div>
        <div data-tid='container'>a</div>
      </div>
    )
  }
}
