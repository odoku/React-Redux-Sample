import * as React from 'react'
import { Link } from 'react-router-dom'

// Props
// ==================================================================
// None

// Component
// ==================================================================
export class Home extends React.Component<{}, {}> {
  public render () {
    return (
      <div>
        <h1>Hello!!!!</h1>
        <Link to='/login'>Login</Link>
      </div>
    )
  }
}

// Redux connect
// ==================================================================
// None
