import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '~/assets/sass/page.scss'
import { App } from './App'
import { store } from './modules'

const theme: Theme = createMuiTheme({})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#app') as HTMLElement
)
