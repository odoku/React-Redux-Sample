import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose, pure, setDisplayName } from 'recompose'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import LoginForm, { Values as LoginFormValues } from '~/components/organisms/LoginForm'
import { RootState } from '~/modules'
import { login } from '~/modules/auth'

// Props
// ==================================================================
interface Props {
  isAuthenticated: boolean
  handleSubmit: (values: LoginFormValues) => void
}

// Component
// ==================================================================
const BaseComponent: React.SFC<Props> = ({ isAuthenticated, handleSubmit }) => (
  <div>
    {isAuthenticated && <Redirect to='/' />}
    <h1>Login</h1>
    <LoginForm onSubmit={handleSubmit} />
  </div>
)

// Enhance
// ==================================================================
const EnhancedComponent = compose<Props, Props>(
  setDisplayName('Login'),
  pure
)(BaseComponent)

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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent)
