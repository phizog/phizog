import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'
import { remote, shell, ipcRenderer } from 'electron'
import { constants, meta } from '../modules/constants'
import { Link, RouteComponentProps } from 'react-router-dom'
import Spinner from 'react-loading'
import { Grid, Row, Col } from 'react-flexbox-grid'
import * as classnames from 'classnames'
import { IProfiler, TProfile } from '../modules/profiler/interfaces'
import styled from 'styled-components'
import { guestProfile } from '../modules/profiler'

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #141414;
  text-align: center;
  & > div {
    display: inline-block;
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%);
    div {
      margin: 0 auto;
    }
  }
  p {
    color: #f1f1f1;
    margin: 10px 0 0;
    font-size: 0.9em;
    letter-spacing: 0.5px;
  }
`

const LoginHeader = styled.p`
  font-size: 0.8em;
  font-weight: bold;
`

const ButtonGithub = styled.button`
  padding: 6px 9px;
  background: #f1f1f1;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
    font-size: 0.8em;
    font-weight: 500;
    padding-left: 7px;
  }
`

const Terms = styled.p`
  font-size: 0.8em;
  padding: 0 5em;
  color: #ccc;
  a {
    color: #f1f1f1;
  }
`

const SkipButton = styled.p`
  font-size: 0.8em;
`

const Logo = styled.div`
  height: 48px;
  margin-top: 3em;
  img {
    height: 32px;
  }
`

interface ILoginProps extends RouteComponentProps<any> {
  inProgress: boolean
  profile: IProfiler
  toggle(): void
}

interface ILoginState {
  oauthProcessing: boolean
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      oauthProcessing: false
    }
  }
  login = () => {
    this.props.toggle()
    this.setState({
      oauthProcessing: true
    })

    ipcRenderer.send('oauth')
  }
  componentWillMount() {
    let win = remote.getCurrentWindow()
    win.setMinimumSize(
      constants.windows.login.width,
      constants.windows.login.height
    )
    win.setSize(constants.windows.login.width, constants.windows.login.height)
    win.setResizable(constants.windows.login.resizable)

    ipcRenderer.on('oauthResult', (event: any, response: TProfile) => {
      if (response) {
        this.props.profile.save(response)

        // @ts-ignore
        const _successfulLoginNotif = new Notification(meta.title, {
          body: constants.notification.login.successful.title
        })

        if (this.props.inProgress) this.props.toggle()
        this.setState({
          oauthProcessing: false
        })
        this.props.history.push('/')
      } else {
        this.props.profile.save(guestProfile)

        // @ts-ignore
        const failedLoginNotif = new Notification(meta.title, {
          body: constants.notification.login.failed.title
        })
      }
    })
  }
  render() {
    const { inProgress } = this.props
    const inProgressView = (
      <SpinnerOverlay style={{ display: inProgress ? 'inherit' : 'none' }}>
        <div>
          <Spinner type="bubbles" color="#f1f1f1" height={24} width={24} />
          <p>Abracadabra</p>
        </div>
      </SpinnerOverlay>
    )

    return (
      <div className={classnames('subwindow', 'align_center')}>
        <Grid
          fluid
          style={{
            height: '100%',
            display: this.state.oauthProcessing ? 'none' : 'flex'
          }}
        >
          <Row
            middle="xs"
            style={{ height: '100%', display: inProgress ? 'none' : 'flex' }}
          >
            <Col xs={12} sm={12} md={12} lg={12}>
              <Logo>
                <img src="resources/logo/phizog.svg" />
              </Logo>
              <LoginHeader>Sign into your account</LoginHeader>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ButtonGithub onClick={this.login}>
                <svg
                  aria-labelledby="simpleicons-github-icon"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title id="simpleicons-github-icon">GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>Connect with Github</span>
              </ButtonGithub>
              <Terms>
                By signing in you agree to our{' '}
                <a
                  onClick={() =>
                    shell.openExternalSync('https://phizog.github.io/terms')
                  }
                >
                  Terms & Privacy
                </a>
              </Terms>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <SkipButton>
                <Link to={{ pathname: '/', state: { skipLogin: true } }}>
                  Skip signing in and take me straight to Phizog
                </Link>
              </SkipButton>
            </Col>
          </Row>
        </Grid>
        {inProgressView}
      </div>
    )
  }
}

function mapStateToProps(state: IState): Partial<ILoginProps> {
  return {
    inProgress: state.inProgress
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(InprogressActions, dispatch)
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) as any) as React.StatelessComponent<ILoginProps>
