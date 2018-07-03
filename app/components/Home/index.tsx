import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../../modules/constants'
import { Link } from 'react-router-dom'

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
          <Link to='/login'>Logout</Link>
        </div>
      </div>
    )
  }
}
