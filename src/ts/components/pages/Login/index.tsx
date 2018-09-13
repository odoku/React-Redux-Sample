import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import LoginForm, { IValues as ILoginFormValues } from '~/components/organisms/LoginForm'
import { IRootState } from '~/modules'
import { login } from '~/modules/auth'

// Props
// ==================================================================
export interface IProps {
  handleSubmit: (values: ILoginFormValues) => void
  isAuthenticated: boolean
}

// Component
// ==================================================================
const Login: React.SFC<IProps> = ({ handleSubmit, isAuthenticated }) => (
  <div>
    {isAuthenticated && <Redirect to='/' />}
    <h1>Login</h1>
    <LoginForm onSubmit={handleSubmit} />
  </div>
)

// Redux connect
// ==================================================================
type IStateProps = Pick<IProps, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<IStateProps, {}, IRootState> = ({ auth }, props) => {
  return { isAuthenticated: auth.isAuthenticated }
}

type DispatchProps = Pick<IProps, 'handleSubmit'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<IRootState, void, AnyAction>
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
