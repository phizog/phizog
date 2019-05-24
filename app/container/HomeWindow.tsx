import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IHomeProps, Home } from './home'
import * as InprogressActions from '../actions/inprogress'
import { IState } from '../reducers'

function mapStateToProps(state: IState): Partial<IHomeProps> {
  return {
    inProgress: state.inProgress
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(InprogressActions, dispatch)
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Home) as any) as React.StatelessComponent<IHomeProps>
