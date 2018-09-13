import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { LoginForm, Values as LoginFormValues } from '~/components/organisms/LoginForm'
import { RootState } from '~/modules'
import { login } from '~/modules/auth'

// Props
// ==================================================================
export interface Props {
  handleSubmit: (values: LoginFormValues) => void
  isAuthenticated: boolean
}

// Component
// ==================================================================
class BaseLogin extends React.Component<Props, {}> {
  public render () {
    return (
      <div>
        {this.props.isAuthenticated && <Redirect to='/' />}
        <h1>Login</h1>
        <LoginForm onSubmit={this.props.handleSubmit} />
      </div>
    )
  }
}

// Redux connect
// ==================================================================
type StateProps = Pick<Props, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = ({ auth }, props) => ({
  isAuthenticated: auth.isAuthenticated
})

type DispatchProps = Pick<Props, 'handleSubmit'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  handleSubmit: (values) => {
    return dispatch(login.action({
      username: values.username,
      password: values.password
    }))
  }
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(BaseLogin)
