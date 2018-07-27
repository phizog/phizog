import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../css/variables'
import Icon from '../../resources/icons'

const TitlebarStyle = styled.div`
  height: 36px;
  background: ${variables.backColorPrimary};
`

const Logo = styled.div`
  img {
    width: 24px;
    height: 36px;
  }
`

const Nav = styled.div``

export default class Titlebar extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }
  render () {
    return (
      <TitlebarStyle>
        <Row middle='xs'>
          <Col xs={4} className={classnames('align_left')} />
          <Col xs={4}>
            <Logo className={classnames('align_center')}>
              <img src='resources/logo/phizog.svg' />
            </Logo>
          </Col>
          <Col xs={4}>
            <Nav className={classnames('align_right')}>
              <button>
                <Icon color='transparent' kind='user' width={16} height={16} />
                <span>Login</span>
              </button>
            </Nav>
          </Col>
        </Row>
      </TitlebarStyle>
    )
  }
}
