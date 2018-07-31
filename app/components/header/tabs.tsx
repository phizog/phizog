import * as React from 'react'
import styled from 'styled-components'
import * as classnames from 'classnames'
import * as UUID from 'uuid/v4'
import { findDOMNode } from 'react-dom'

export type TabState = {
  title: string
  focused: boolean
}
export type TabProps = {
  onInit (tab: Tab): void
  onClick (tab: Tab): void
  id: string
}

const TabStyle = styled.div`
  background: transparent;
  font-size: 0.8em;
  padding: 0 11px;
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  width: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  &.focused {
    border-right: 0;
    background: rgba(255, 255, 255, 0.05);
  }
  span {
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
`

export class Tab extends React.Component<TabProps, TabState> {
  constructor (props: any) {
    super(props)
    this.activeTab = this.activeTab.bind(this)
    this.deactiveTab = this.deactiveTab.bind(this)
    this.state = {
      title: 'New Connection',
      focused: false
    }
  }
  activeTab () {
    this.setState({
      focused: true
    })
    this.props.onClick(this)
  }
  deactiveTab () {
    this.setState({
      focused: false
    })
  }
  componentDidMount () {
    this.props.onInit(this)
  }
  render () {
    return (
      <TabStyle
        className={classnames(
          this.state.focused ? 'focused' : '',
          'align_left'
        )}
        onClick={this.activeTab}
      >
        <span>{this.state.title}</span>
      </TabStyle>
    )
  }
}

export type TabsState = {
  tabs: any
}

const TabsStyle = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  height: 32px;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`
const TabNode = styled.li`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-basis: 180px;
  min-width: 80px;
`

export class Tabs extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.tabOnInitCallback = this.tabOnInitCallback.bind(this)
    this.tabOnClickCallback = this.tabOnClickCallback.bind(this)
    this.newTab = this.newTab.bind(this)
    this.state = {
      tabs: {},
      tabsRef: React.createRef(),
      focusedTab: ''
    }
  }
  tabOnInitCallback (tab: Tab) {
    if (this.state.focusedTab) {
      this.state.tabs[this.state.focusedTab].current.deactiveTab()
    }
    tab.activeTab()
    this.setState({
      focusedTab: tab.props.id
    })
  }
  tabOnClickCallback (tab: Tab) {
    if (this.state.focusedTab) {
      this.state.tabs[this.state.focusedTab].current.deactiveTab()
    }
    this.setState({
      focusedTab: tab.props.id
    })
  }
  newTab () {
    const key: string = UUID()
    let tabs = this.state.tabs
    tabs[key] = React.createRef()
    this.setState({
      tabs: tabs
    })
  }
  componentWillMount () {
    this.newTab()
  }
  componentWillUpdate () {
    let tabsNode: any = findDOMNode(this.state.tabsRef.current)
    tabsNode.scroll({
      left: tabsNode.scrollWidth,
      behavior: 'smooth'
    })
  }
  render () {
    let tabsNodes = Object.keys(this.state.tabs).map((tab: any) => {
      return (
        <TabNode key={tab}>
          <Tab
            id={tab}
            ref={this.state.tabs[tab]}
            onInit={this.tabOnInitCallback}
            onClick={this.tabOnClickCallback}
          />
        </TabNode>
      )
    })
    return (
      <div>
        <TabsStyle ref={this.state.tabsRef}>{tabsNodes}</TabsStyle>
        <button onClick={this.newTab}>New Tab</button>
      </div>
    )
  }
}
