import * as React from 'react'
import styled from 'styled-components'
import variables from '../../../components/css/variables'
import { IHomeProps } from '..'

const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  background: ${variables.containerBg};
`

export default class Container extends React.Component<IHomeProps, any> {
  constructor(props: any) {
    super(props)
  }
  logout = () => {
    if (this.props.inProgress) this.props.toggle()
    this.props.profile.destroy()
    this.props.history.push('/login')
  }
  render() {
    return (
      <ContainerStyle>
        This is Phizog
        <button onClick={this.logout}>Logout</button>
      </ContainerStyle>
    )
  }
}
