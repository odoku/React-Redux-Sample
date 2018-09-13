import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.SFC<{}> = (props) => (
  <div>
    <h1>Hello!!!!</h1>
    <Link to='/login'>Login</Link>
  </div>
)

export default Home
