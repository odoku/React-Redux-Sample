import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import Home from '~/components/pages/Home'
import Login from '~/components/pages/Login'
import LoginRequired from '~/components/utils/LoginRequired'
import { RootState } from '~/modules'
import { checkLoggedin } from '~/modules/auth'

interface Props {
  isAuthenticated: boolean
  onWillMount: () => void
}

class App extends React.Component<Props, {}> {
  public componentWillMount () {
    this.props.onWillMount()
  }

  public render () {
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
type IStateProps = Pick<Props, 'isAuthenticated'>
const mapStateToProps: MapStateToProps<IStateProps, {}, RootState> = ({ auth }, props) => {
  return { isAuthenticated: auth.isAuthenticated }
}

type DispatchProps = Pick<Props, 'onWillMount'>
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    onWillMount: () => {
      return dispatch(checkLoggedin.action())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
