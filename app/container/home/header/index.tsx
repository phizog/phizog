import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../../../components/css/variables'
import { Button, GroupButton } from '../../../components/button'
import { Tabs } from './tabs'
import ReactSVG from 'react-svg'

const HeaderStyle = styled.div`
  background: ${variables.backColorPrimary}
  padding: 0 4px 0 0
  box-shadow: 1px 1px 0 rgba(255,255,255, .06)
`

const Nav = styled.div``

export default class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HeaderStyle>
        <Row middle="xs">
          <Col xs={10} className={classnames('align_left')}>
            <Tabs />
          </Col>
          <Col xs={2}>
            <Nav className={classnames('align_right')}>
              <GroupButton
                style={{ display: 'inline-block', marginRight: '6px' }}
              >
                <Button className={classnames('transparent')}>
                  <ReactSVG src='resources/icons/svg/settings.svg' beforeInjection={svg => { svg.setAttribute('fill', variables.buttonColor) }} />
                </Button>
                <Button className={classnames('transparent')}>
                  <ReactSVG src='resources/icons/svg/sync.svg' beforeInjection={svg => { svg.setAttribute('fill', variables.buttonColor) }} />
                </Button>
                <Button className={classnames('transparent')}>
                  <ReactSVG src='resources/icons/svg/favorite.svg' beforeInjection={svg => { svg.setAttribute('fill', variables.buttonColor) }} />
                </Button>
              </GroupButton>
              <Button>
                <ReactSVG src='resources/icons/svg/user.svg' beforeInjection={svg => { svg.setAttribute('fill', 'transparent') }} style={{ display: 'inherit' }} />
                <span>Login</span>
              </Button>
            </Nav>
          </Col>
        </Row>
      </HeaderStyle>
    )
  }
}
