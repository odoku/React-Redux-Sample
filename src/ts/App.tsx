import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import Home from '~/components/pages/Home'
import Login from '~/components/pages/Login'
import LoginRequired from '~/components/utils/LoginRequired'
import { IRootState } from '~/modules'
import { checkLoggedin } from '~/modules/auth'

interface IProps {
  isAuthenticated: boolean
  onWillMount: () => void
}

class App extends React.Component<IProps, {}> {
  componentWillMount() {
    this.props.onWillMount()
  }

  render() {
    return (
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
  }
}

// Redux connect
// ==================================================================
type IStateProps = Pick<IProps, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<IStateProps, {}, IRootState> = ({ auth }, props) => {
  return { isAuthenticated: auth.isAuthenticated }
}

type DispatchProps = Pick<IProps, 'onWillMount'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<IRootState, void, AnyAction>
) => {
  return {
    onWillMount: () => {
      return dispatch(checkLoggedin.action())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
