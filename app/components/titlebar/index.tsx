import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../css/variables'
import * as is from 'electron-is'

const TitlebarStyle = styled.div`
  height: 36px;
  background: ${variables.backColorPrimary};
`

const Logo = styled.div`
  img {
    width: 32px;
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
        <Row
          middle='xs'
          style={{ flexDirection: is.windows() ? 'row-reverse' : 'row' }}
        >
          <Col xs={4} />
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
