import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { IProps, Login } from '../components/login'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'

function mapStateToProps (state: IState): Partial<IProps> {
  return {
    inProgress: state.inProgress
  }
}

function mapDispatchToProps (dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators(InprogressActions as any, dispatch)
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) as any) as React.StatelessComponent<IProps>
