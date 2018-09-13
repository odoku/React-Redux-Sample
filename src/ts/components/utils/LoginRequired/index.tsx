import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { RootState } from '~/modules'

// Props
// ==================================================================
interface Props {
  isAuthenticated: boolean
}

// Component
// ==================================================================
const LoginRequired: React.SFC<Props> = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    // XXX: 余計な <div /> を削除したい！
    return <div>{children}</div>
  }
  return <Redirect to='/login' />
}

// Redux connect
// ==================================================================
const mapStateToProps: MapStateToProps<Props, {}, RootState> = ({ auth }, props) => {
  return { isAuthenticated: auth.isAuthenticated }
}

export default connect(mapStateToProps, () => ({}))(LoginRequired)
