import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose, pure, setDisplayName } from 'recompose'

import { RootState } from '~/modules'

// Props
// ==================================================================
interface Props {
  isAuthenticated: boolean
}

// Component
// ==================================================================
const BaseComponent: React.SFC<Props> = ({ children, isAuthenticated }) => (
  <div>
    {isAuthenticated ? children : <Redirect to='/login' />}
  </div>
)

// Enhance
// ==================================================================
const EnhancedComponent = compose<Props, Props>(
  setDisplayName('LoginRequired'),
  pure
)(BaseComponent)

// Redux connect
// ==================================================================
const mapStateToProps: MapStateToProps<Props, {}, RootState> = ({ auth }, props) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, () => ({}))(EnhancedComponent)
