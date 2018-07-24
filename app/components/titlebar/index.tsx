import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../css/variables'
import { remote } from 'electron'

const TitlebarStyle = styled.div`
  height: 36px;
  background: ${variables.backColorPrimary} .logo {
    img {
      width: 32px;
    }
  }
`

const Controls = styled.div``

export interface IState {
  window: {
    maximized?: boolean
    minimized?: boolean
  }
}

let win = remote.getCurrentWindow()

export default class Titlebar extends React.Component<any, IState> {
  constructor (props: any) {
    super(props)
    this.maximizeWindow = this.maximizeWindow.bind(this)
    this.state = {
      window: {
        maximized: false,
        minimized: false
      }
    }
  }
  maximizeWindow () {
    this.setState({
      window: {
        maximized: !win.isMaximized(),
        minimized: false
      }
    })
    if (win.isMaximized()) return win.unmaximize()
    return win.maximize()
  }
  componentWillMount () {
    this.setState({
      window: {
        maximized: win.isMaximized()
      }
    })
  }
  render () {
    return (
      <TitlebarStyle>
        <Row middle='xs'>
          <Col xs={4}>
            <Controls className={classnames('align_left')}>
              <button onClick={this.maximizeWindow}>
                {this.state.window.maximized ? 'unmaximize' : 'maximize'}
              </button>
            </Controls>
          </Col>
          <Col xs={4}>
            <div className={classnames('align_center', 'logo')}>
              <img src='resources/logo/phizog.svg' />
            </div>
          </Col>
          <Col xs={4}>
            <div className={classnames('align_right', 'nav')}>a</div>
          </Col>
        </Row>
      </TitlebarStyle>
    )
  }
}
