import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose, pure, setDisplayName } from 'recompose'

// Props
// ==================================================================
interface Props {}

// Component
// ==================================================================
const BaseComponent: React.SFC<Props> = () => (
  <div>
    <h1>Hello!!!!</h1>
    <Link to='/login'>Login</Link>
  </div>
)

// Enhance
// ==================================================================
const EnhancedComponent = compose<Props, Props>(
  setDisplayName('Home'),
  pure
)(BaseComponent)

// Redux connect
// ==================================================================
export default connect(() => ({}), () => ({}))(EnhancedComponent)
