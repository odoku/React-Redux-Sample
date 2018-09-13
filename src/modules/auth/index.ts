import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

import * as api from '~/api'
import { User } from '~/models'
import { RootState } from '~/modules'

// State
// ==================================================================
export interface AuthState {
  isAuthenticated: boolean
  accessToken: string,
  user: User | null
}

const createInitialState = (): AuthState => ({
  isAuthenticated: false,
  accessToken: '',
  user: null
})

// Prepare
// ==================================================================
const actionCreator = actionCreatorFactory('auth')
const createAsync = asyncFactory<RootState>(actionCreator)
export const reducer = reducerWithInitialState<AuthState>(createInitialState())

// Action - Login
// ==================================================================
export interface Credential {
  username: string
  password: string
}

interface UserAndAccessToken {
  accessToken: string
  user: User
}

export const login = createAsync<Credential, UserAndAccessToken>(
  'LOGIN',
  async ({ username, password }, dispatch, getState) => {
    // TODO: Error handling
    const response = await api.login({ username, password })
    localStorage.setItem('access_token', response.jwt)
    return {
      accessToken: response.jwt,
      user: response.data
    }
  }
)

reducer.case(login.async.started, (state): AuthState => ({ ...state }))

reducer.case(login.async.failed, (state, { error }): AuthState => ({ ...state }))

reducer.case(login.async.done, (state, { result: { accessToken, user } }): AuthState => ({
  ...state,
  isAuthenticated: true,
  accessToken,
  user
}))

// Action - Check Loggedin
// ==================================================================
export const checkLoggedin = createAsync<never, UserAndAccessToken>(
  'CHECK_LOGIN',
  async (params, dispatch, getState) => {
    const { auth } = getState()
    if (auth.isAuthenticated && auth.user) {
      return {
        accessToken: auth.accessToken,
        user: auth.user
      }
    }

    // TODO: Error handling
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw Error('Access token is not found.')
    }

    // TODO: Error handling
    const response = await api.getUser(accessToken)
    return {
      accessToken,
      user: response.data
    }
  }
)

reducer.case(checkLoggedin.async.started, (state): AuthState => ({ ...state }))

reducer.case(checkLoggedin.async.failed, (state, { error }): AuthState => ({ ...state }))

reducer.case(checkLoggedin.async.done, (state, { result: { accessToken, user } }): AuthState => ({
  ...state,
  isAuthenticated: true,
  accessToken,
  user
}))

// Action - Logout
// ==================================================================
export const logout = createAsync<void, void>(
  'LOGOUT',
  async (params, dispatch) => {
    await api.logout()
  }
)
