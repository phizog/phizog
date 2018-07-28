import * as React from 'react'
import styled from 'styled-components'
import * as classnames from 'classnames'

export interface TabState {
  title: string
  focused: boolean
}

const TabStyle = styled.li`
  background: transparent
  &.focused {
    background: red
  }
`

export class Tab extends React.Component<any, TabState> {
  constructor (props: any) {
    super(props)
    this.state = {
      title: 'New Connection',
      focused: true
    }
  }
  render () {
    return (
      <TabStyle className={classnames(this.state.focused ? 'focused' : '')}>
        <span>{this.state.title}</span>
      </TabStyle>
    )
  }
}

const TabsStyle = styled.ul`
  display: flex;
  padding: 0
  margin: 0
  height: 32px
`

export class Tabs extends React.Component {
  constructor (props: any) {
    super(props)
  }
  render () {
    const defaultTabs = [
      <Tab />
    ]
    return (
      <TabsStyle>{defaultTabs}</TabsStyle>
    )
  }
}
