import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import variables from '../../../components/css/variables'
import Icon from '../../../resources/icons'
import { Button, GroupButton } from '../../../components/button'
import { Tabs } from './tabs'

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
                  <Icon
                    color={variables.buttonColor}
                    kind="settings"
                    width={13}
                    height={13}
                  />
                </Button>
                <Button className={classnames('transparent')}>
                  <Icon
                    color={variables.buttonColor}
                    kind="sync"
                    width={13}
                    height={13}
                  />
                </Button>
                <Button className={classnames('transparent')}>
                  <Icon
                    color={variables.buttonColor}
                    kind="favorite"
                    width={13}
                    height={13}
                  />
                </Button>
              </GroupButton>
              <Button>
                <Icon color="transparent" kind="user" width={13} height={13} />
                <span>Login</span>
              </Button>
            </Nav>
          </Col>
        </Row>
      </HeaderStyle>
    )
  }
}
