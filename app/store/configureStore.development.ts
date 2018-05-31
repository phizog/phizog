import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__? (a: any): void;
}

declare const module: NodeModule & {
  hot?: {
    accept (...args: any[]): any;
  }
}

const logger = (createLogger as any)({
  level: 'info',
  collapsed: true
})

const history = createHashHistory()
const router = routerMiddleware(history)

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  }) as any :
  compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
)

export = {
  history,
  configureStore (initialState: Object) {
    const store = createStore(rootReducer, initialState, enhancer)

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers'))
      )
    }

    return store
  }
}
