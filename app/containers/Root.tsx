import * as React from 'react'
import { Store, Provider } from 'react-redux'
import { History } from 'history'
import { ConnectedRouter } from 'react-router-redux'
import Routes from '../routes'

interface IRootType {
  store: Store<any>
  history: History
}

export default function Root ({ store, history }: IRootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}
