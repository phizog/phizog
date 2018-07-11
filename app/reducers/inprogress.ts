import { IAction } from '../actions/helpers'
import { toggle } from '../actions/inprogress'

export type TState = boolean

export default function inProgress (state: boolean = true, action: IAction) {
  if (toggle.test(action)) {
    return !state
  }

  return state
}
