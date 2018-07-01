import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'
import { Auth } from '../providers/Auth'

function mapStateToProps (state: IState): Partial<any> {
  return {
    inProgress: state.inProgress
  }
}

function mapDispatchToProps (dispatch: Dispatch<IState>): Partial<any> {
  return bindActionCreators(InprogressActions as any, dispatch)
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth) as any) as React.StatelessComponent<any>
