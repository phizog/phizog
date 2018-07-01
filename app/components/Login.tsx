import * as React from 'react'
import { remote } from 'electron'
import { constants } from '../modules/constants'
// import { authorizer } from '../providers/Auth'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Row } from './Grid/Row/Row'
import { Col } from './Grid/Col/Col'
import Spinner from 'react-loading'
import { authorizer } from '../providers/Auth'

let styles = require('../styles/windows/login.scss')

export interface IProps extends RouteComponentProps<any> {
  inProgress: boolean
}

@authorizer()
export class Login extends React.Component<any> {
  constructor (props: any) {
    super(props)
  }
  render () {
    const { inProgress } = this.props
    let win = remote.getCurrentWindow()
    win.setSize(constants.windows.login.width, constants.windows.login.height)
    // win.center()

    return (
      <div className={styles.window}>
        <div
          className={styles.spinnerOverlay}
          style={{ display: inProgress ? 'inherit' : 'none' }}
        >
          <div>
            <Spinner type='bubbles' color='#f1f1f1' height={24} width={24} />
            <p>Abracadabra</p>
          </div>
        </div>
        <Row style={{ display: inProgress ? 'none' : 'inherit' }}>
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
