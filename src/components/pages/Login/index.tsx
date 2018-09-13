import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import LoginForm, { Values as LoginFormValues } from '~/components/organisms/LoginForm'
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
const Login: React.SFC<Props> = ({ handleSubmit, isAuthenticated }) => (
  <div>
    {isAuthenticated && <Redirect to='/' />}
    <h1>Login</h1>
    <LoginForm onSubmit={handleSubmit} />
  </div>
)

// Redux connect
// ==================================================================
type StateProps = Pick<Props, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = ({ auth }, props) => {
  return { isAuthenticated: auth.isAuthenticated }
}

type DispatchProps = Pick<Props, 'handleSubmit'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    handleSubmit: (values) => {
      return dispatch(login.action({
        password: values.password,
        username: values.username
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
