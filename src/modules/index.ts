import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import * as AuthModule from './auth'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export interface RootState {
  auth: AuthModule.AuthState,
}

export const store = createStore(
  combineReducers({
    auth: AuthModule.reducer
  }),
  composeEnhancers(applyMiddleware(thunk))
)
