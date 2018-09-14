import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '~/App'
import '~/assets/sass/page.scss'
import * as fakeAPI from '~/fakeAPI'
import { store } from '~/modules'

// TODO: Only development
fakeAPI.register()

const theme: Theme = createMuiTheme({})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#app') as HTMLElement
)
