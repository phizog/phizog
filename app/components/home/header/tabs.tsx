import * as React from 'react'
import styled from 'styled-components'
import * as classnames from 'classnames'
import * as UUID from 'uuid/v4'
import { findDOMNode } from 'react-dom'
import variables from '../../css/variables'
import Icon from '../../../resources/icons'
import { Button } from '../../button'

export type TabState = {
  title: string
  focused: boolean
  closed: boolean
}
export type TabProps = {
  onInit (tab: Tab): void
  onClick (tab: Tab): void
  onClose (requestedTab: Tab, callback: Function): void
  id: string
  prevTab: string
  nextTab: string
}

const TabStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-basis: 180px;
  min-width: 80px;
  background: transparent;
  font-size: 0.8em;
  padding: 0 4px 0 11px;
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  width: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  &.focused {
    background: rgba(255, 255, 255, 0.05);
    span {
      color: #fff;
    }
  }
  span {
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${variables.buttonColor};
    flex: 1;
  }
`

export class Tab extends React.Component<TabProps, TabState> {
  constructor (props: any) {
    super(props)
    this.activeTab = this.activeTab.bind(this)
    this.deactiveTab = this.deactiveTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.state = {
      title: 'New Connection',
      focused: false,
      closed: false
    }
  }
  activeTab (onClose?: any) {
    if (!this.state.focused) {
      this.setState({
        focused: true
      })
      if (!onClose) this.props.onClick(this)
    }
  }
  deactiveTab () {
    this.setState({
      focused: false
    })
  }
  closeTab () {
    this.props.onClose(this, () => {
      this.setState({
        closed: true,
        focused: false
      })
    })
  }
  componentDidMount () {
    this.props.onInit(this)
  }
  render () {
    if (this.state.closed) return null
    return (
      <TabStyle
        className={classnames(
          this.state.focused ? 'focused' : '',
          'align_left'
        )}
        onClick={this.activeTab}
      >
        <span>{this.state.title}</span>
        <Button
          onClick={this.closeTab}
          className={classnames('transparent', 'close_tab')}
        >
          <Icon color='transparent' kind='close' width={5} height={5} />
        </Button>
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

const NewTab = styled.button`
  background: none;
  border: 0;
  outline: 0;
  color: ${variables.buttonColor};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
  padding: 0 11px;
  position: sticky;
  right: 0;
  // box-shadow: 0 0 150px 50px rgba(0, 0, 0, 0.65);
  &:hover {
    color: #fff;
  }
`

export class Tabs extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.tabOnInitCallback = this.tabOnInitCallback.bind(this)
    this.tabOnClickCallback = this.tabOnClickCallback.bind(this)
    this.tabOnCloseCallback = this.tabOnCloseCallback.bind(this)
    this.newTab = this.newTab.bind(this)
    this.state = {
      tabs: new Map(),
      tabsRef: React.createRef(),
      focusedTab: '',
      lastTab: null
    }
  }
  tabOnInitCallback (tab: Tab) {
    if (this.state.focusedTab) {
      this.state.tabs.get(this.state.focusedTab).ref.current.deactiveTab()
    }
    tab.activeTab()
    this.setState({
      focusedTab: tab.props.id
    })
  }
  tabOnClickCallback (tab: Tab) {
    if (this.state.focusedTab) {
      this.state.tabs.get(this.state.focusedTab).ref.current.deactiveTab()
    }
    this.setState({
      focusedTab: tab.props.id
    })
  }
  tabOnCloseCallback (requestedTab: Tab, callback: Function) {
    if (this.state.tabs.size === 1) return

    let focusOn: string = 'prevTab'
    callback()
    let tabs: Map<string, object> = this.state.tabs
    let prevTab: any = tabs.get(requestedTab.props.prevTab)
    let nextTab: any = tabs.get(requestedTab.props.nextTab)

    // set nexttab
    if (requestedTab.props.prevTab && requestedTab.props.nextTab) {
      tabs.set(requestedTab.props.prevTab, Object.assign(prevTab, {
        nextTab: requestedTab.props.nextTab
      }))
      tabs.set(requestedTab.props.nextTab, Object.assign(nextTab, {
        prevTab: requestedTab.props.prevTab
      }))
      focusOn = 'nextTab'
    }

    // focus on new tab
    let tab = focusOn === 'nextTab' ? nextTab : prevTab
    tab.ref.current.activeTab(true)

    // delete requested tab
    tabs.delete(requestedTab.props.id)

    this.setState({
      focusedTab: tab.ref.current.props.id,
      lastTab: tab.ref.current.props.id,
      tabs: tabs
    })
  }
  newTab () {
    const key: string = UUID()
    let tabs: Map<string, object> = this.state.tabs
    tabs.set(key, {
      ref: React.createRef(),
      prevTab: this.state.lastTab ? this.state.lastTab : null,
      nextTab: null
    })
    if (this.state.lastTab) {
      let lastTab: any = tabs.get(this.state.lastTab)
      tabs.set(lastTab.ref.current.props.id, Object.assign(tabs.get(lastTab.ref.current.props.id), {
        nextTab: key
      }))
    }
    this.setState({
      tabs: tabs,
      lastTab: key
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
    let tabsNodes = ((arr: Map<string, object>) => {
      let toReturn: any = []
      arr.forEach((properties: any, tab: any) => {
        toReturn.push(
          <Tab
            id={tab}
            ref={properties.ref}
            onInit={this.tabOnInitCallback}
            onClick={this.tabOnClickCallback}
            onClose={this.tabOnCloseCallback}
            prevTab={properties.prevTab}
            nextTab={properties.nextTab}
          />)
      })

      return toReturn
    })

    return (
      <TabsStyle ref={this.state.tabsRef}>
        {tabsNodes(this.state.tabs)}
        <NewTab onClick={this.newTab}>+</NewTab>
      </TabsStyle>
    )
  }
}
