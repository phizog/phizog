import { combineReducers } from 'redux'
import inProgress, { TState as TInProgressState } from './inprogress'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history: any) =>
  combineReducers({
    inProgress,
    router: connectRouter(history)
  })

export interface IState {
  inProgress: TInProgressState
  type: ''
}

export default rootReducer
