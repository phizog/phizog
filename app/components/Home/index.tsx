import * as React from 'react'
import { authorizer } from '../../providers/auth'
import { remote } from 'electron'
import { constants } from '../../modules/constants'

@authorizer()
export default class Home extends React.Component<any> {
  componentWillMount () {
    let win = remote.getCurrentWindow()
    win.setResizable(true)
    win.setMinimumSize(
      constants.windows.main.width,
      constants.windows.main.height
    )
    win.setSize(constants.windows.main.width, constants.windows.main.height)
    win.center()
  }
  render () {
    return (
      <div>
        <div data-tid='container'>
          <p>This is,</p>
          <h2>Phizog</h2>
        </div>
      </div>
    )
  }
}
