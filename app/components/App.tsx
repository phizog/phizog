import * as React from 'react'
import styled from 'styled-components'

const Window = styled.div`
  background: #141414;
  height: 100%;
  .subwindow {
    height: 100%;
  }
`
export default class App extends React.Component {
  render () {
    return <Window>{this.props.children}</Window>
  }
}
