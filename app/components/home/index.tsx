import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../../modules/constants'
import { RouteComponentProps } from 'react-router'
import { IProfiler } from '../../modules/profiler/interfaces'
import * as classnames from 'classnames'
import Header from './header'
import Container from './container'

export interface IProps extends RouteComponentProps<any> {
  inProgress: boolean
  profile: IProfiler
  toggle (): void
}

export class Home extends React.Component<IProps> {
  constructor (props: any) {
    super(props)
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
  render () {
    return (
      <div className={classnames('subwindow')}>
        <Header />
        <Container {...this.props} />
      </div>
    )
  }
}
