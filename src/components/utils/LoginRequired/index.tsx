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
const BaseLoginRequired: React.SFC<Props> = ({ children, isAuthenticated }) => (
  <div>
    {isAuthenticated ? children : <Redirect to='/login' />}
  </div>
)

// Redux connect
// ==================================================================
const mapStateToProps: MapStateToProps<Props, {}, RootState> = ({ auth }, props) => ({
  isAuthenticated: auth.isAuthenticated
})

export const LoginRequired = connect(mapStateToProps, () => ({}))(BaseLoginRequired)
