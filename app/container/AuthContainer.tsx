import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'
import { Authorizer } from '../providers/auth'

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
)(Authorizer) as any) as React.StatelessComponent<any>
