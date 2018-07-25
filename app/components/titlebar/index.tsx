import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../css/variables'
import { remote } from 'electron'
import * as is from 'electron-is'

const TitlebarStyle = styled.div`
  -webkit-app-region: drag;
  height: 36px;
  background: ${variables.backColorPrimary};
`

const Logo = styled.div`
  img {
    width: 32px;
    height: 36px;
  }
`

const Controls = styled.div``
const Nav = styled.div``

export interface IState {
  window: {
    maximized?: boolean
  }
}

let win = remote.getCurrentWindow()
export default class Titlebar extends React.Component<any, IState> {
  constructor (props: any) {
    super(props)
    this.maximizeWindow = this.maximizeWindow.bind(this)
    this.minimizeWindow = this.minimizeWindow.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.state = {
      window: {
        maximized: false
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
  closeWindow () {
    return win.close()
  }
  minimizeWindow () {
    return win.minimize()
  }
  componentWillMount () {
    this.setState({
      window: {
        maximized: win.isMaximized()
      }
    })
  }
  render () {
    let controlButtons = [
      {
        label: 'Close',
        function: this.closeWindow
      },
      {
        label: 'Minimize',
        function: this.minimizeWindow
      },
      {
        label: 'Maximize',
        function: this.maximizeWindow
      }
    ]

    // change buttons order in case of Windows OS
    if (is.windows()) {
      controlButtons.splice(1, 0, ...controlButtons.splice(2, 1))
      controlButtons.reverse()
    }

    const controlsList = controlButtons.map((item, index) => {
      return (
        <button onClick={item.function} key={index}>
          {item.label}
        </button>
      )
    })

    return (
      <TitlebarStyle>
        <Row
          middle='xs'
          style={{ flexDirection: is.windows() ? 'row-reverse' : 'row' }}
        >
          <Col xs={4}>
            <Controls
              className={classnames(
                is.windows() ? 'align_right' : 'align_left'
              )}
            >
              {controlsList}
            </Controls>
          </Col>
          <Col xs={4}>
            <Logo className={classnames('align_center')}>
              <img src='resources/logo/phizog.svg' />
            </Logo>
          </Col>
          <Col xs={4}>
            <Nav
              className={classnames(
                is.windows() ? 'align_left' : 'align_right'
              )}
            />
          </Col>
        </Row>
      </TitlebarStyle>
    )
  }
}
