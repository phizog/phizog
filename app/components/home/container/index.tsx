import * as React from 'react'
import { setSkipLogin } from '../../../providers/auth'
import styled from 'styled-components'
import variables from '../../css/variables'
import { IProps } from '..'

const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  background: ${variables.containerBg};
`

export default class Container extends React.Component<IProps, any> {
  constructor (props: any) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    if (this.props.inProgress) this.props.toggle()
    setSkipLogin(this.props.profile, false)
    this.props.history.push('/login')
  }
  render () {
    return (
      <ContainerStyle>
        This is Phizog
        <button onClick={this.logout}>Logout</button>
      </ContainerStyle>
    )
  }
}
