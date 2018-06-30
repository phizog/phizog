import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../modules/constants'
import { authorizer } from '../providers/Auth'
import { Link } from 'react-router-dom'
import { Row } from './Grid/Row/Row'
import { Col } from './Grid/Col/Col'

@authorizer()
export default class Login extends React.Component<any> {
  constructor (props: any) {
    super(props)
  }
  render () {
    let win = remote.getCurrentWindow()
    win.setSize(constants.windows.login.width, constants.windows.login.height)
    win.center()

    return (
      <div className='window__login'>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <img src='' />
            <p>Sign into your account</p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <button>Connect with Github</button>
            <p>
              By signing in you agree to our{' '}
              <Link to='/terms'>Terms & Privacy</Link>
            </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <p>
              <Link to={{ pathname: '/', state: { skipLogin: true } }}>
                Skip signing in and take me straight to Phizog
              </Link>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}
