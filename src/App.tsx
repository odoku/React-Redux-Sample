import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { compose, lifecycle, pure, setDisplayName } from 'recompose'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import Home from '~/components/pages/Home'
import Login from '~/components/pages/Login'
import LoginRequired from '~/components/utils/LoginRequired'
import { RootState } from '~/modules'
import { checkLoggedin } from '~/modules/auth'

// Props
// ==================================================================
interface Props {
  isAuthenticated: boolean
  onWillMount: () => void
}

// Component
// ==================================================================
const BaseComponent: React.SFC<Props> = ({ isAuthenticated }) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <LoginRequired>
        <Switch>
          <Route path='/' component={Home} exact={true} />
        </Switch>
      </LoginRequired>
    </Switch>
  </BrowserRouter>
)

// Enhance
// ==================================================================
const EnhancedComponent = compose<Props, Props>(
  setDisplayName('App'),
  lifecycle<Props, {}>({
    componentWillMount () {
      this.props.onWillMount()
    }
  }),
  pure
)(BaseComponent)

// Redux connect
// ==================================================================
type IStateProps = Pick<Props, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<IStateProps, {}, RootState> = ({ auth }, props) => ({
  isAuthenticated: auth.isAuthenticated
})

type DispatchProps = Pick<Props, 'onWillMount'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  onWillMount: () => {
    return dispatch(checkLoggedin.action())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent)
