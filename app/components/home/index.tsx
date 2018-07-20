import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../../modules/constants'
import { RouteComponentProps } from 'react-router'
import { setSkipLogin } from '../../providers/auth'
import { IProfiler } from '../../modules/profiler/interfaces'

export interface IProps extends RouteComponentProps<any> {
  inProgress: boolean
  profile: IProfiler
  toggle (): void
}

export class Home extends React.Component<IProps> {
  constructor (props: any) {
    super(props)
    this.logout = this.logout.bind(this)
  }
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
  logout () {
    if (this.props.inProgress) this.props.toggle()
    setSkipLogin(this.props.profile, false)
    this.props.history.push('/login')
  }
  render () {
    return (
      <div>
        <div data-tid='container'>
          <p>This is,</p>
          <h2>Phizog</h2>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}
