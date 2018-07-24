import * as React from 'react'
import { Store, Provider } from 'react-redux'
import { History } from 'history'
import { ConnectedRouter } from 'react-router-redux'
import Routes from '../routes'
import { ipcRenderer } from 'electron'
import { injectGlobal } from 'styled-components'
import normalize from 'styled-normalize'
import variables from './css/variables'
injectGlobal`
  ${normalize}
  html,
  body {
    font-family: ${variables.systemFonts};
    color: ${variables.textColorPrimary};
    height: 100%;
  }
  * {
    user-select: none;
  }
  #root {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .align_left {
    text-align: left;
  }
  .align_center {
    text-align: center;
  }
  .align_right {
    text-align: right;
  }
`

interface IRootType {
  store: Store<any>
  history: History
}

export default function Root ({ store, history }: IRootType) {
  // send an sync event to main process to show main window
  ipcRenderer.sendSync('showWindow')

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}
