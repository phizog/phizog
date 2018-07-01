import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import inProgress, { TState as TInProgressState } from './inprogress'

const rootReducer = combineReducers({
  inProgress,
  routing: routing as Reducer<any>
})

export interface IState {
  inProgress: TInProgressState
  type: ''
}

export default rootReducer
