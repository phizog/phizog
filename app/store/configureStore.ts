import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory, createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createRootReducer from '../reducers'

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void
}

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any
  }
}

let history: any
let configureStore: any

if (process.env.NODE_ENV === 'development') {
  const logger = (createLogger as any)({
    level: 'info',
    collapsed: true
  })

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      }) as any)
    : compose

  history = createHashHistory()
  const router = routerMiddleware(history)
  const enhancer = composeEnhancers(applyMiddleware(thunk, router, logger))

  configureStore = (initialState: Object) => {
    const store = createStore(
      createRootReducer(history),
      initialState,
      enhancer
    )

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(createRootReducer(history))
      )
    }

    return store
  }
} else {
  history = createBrowserHistory()
  const router = routerMiddleware(history)
  const enhancer = applyMiddleware(thunk, router)
  configureStore = (initialState: Object) => {
    return createStore(createRootReducer(history), initialState, enhancer)
  }
}

export { history, configureStore }
